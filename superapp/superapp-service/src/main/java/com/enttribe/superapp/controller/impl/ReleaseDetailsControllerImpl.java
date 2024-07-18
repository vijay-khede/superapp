package com.enttribe.superapp.controller.impl;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import com.enttribe.commons.io.excel.ExcelWriter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.enttribe.commons.spring.rest.ResponseBuilder;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotEmpty;
import com.enttribe.product.audit.utils.ActionType;
import com.enttribe.product.audit.utils.Auditable;
import org.hibernate.envers.Audited;
import lombok.extern.slf4j.Slf4j;
import com.enttribe.superapp.controller.ReleaseDetailsController;
import com.enttribe.superapp.model.ReleaseDetails;
import com.enttribe.superapp.service.ReleaseDetailsService;

/**
*
This class represents the implementation of the ReleaseDetailsController interface. It is annotated with
the Spring annotations @RestController, @RequestMapping and @Primary to indicate that it is a
Spring-managed bean and should be used as the primary implementation of the ReleaseDetailsController.
It is also annotated with @Api to provide metadata for the Swagger documentation.
The class also uses Lombok's @Slf4j annotation to automatically generate a logger field named "log"
that is used to log method calls and results.
The class fields include an instance of the ReleaseDetailsService bean, which is injected by Spring using
the @Autowired annotation.
The class implements the following methods:
create(ReleaseDetails ReleaseDetails): creates an ReleaseDetails and returns the newly created ReleaseDetails.
count(String filter): returns the number of ReleaseDetails that match the specified filter.
search(String filter, Integer offset, Integer size, String orderBy, String orderType): returns
a list of ReleaseDetails that match the specified filter, sorted according to the specified orderBy
and orderType.
update(ReleaseDetails ReleaseDetails): updates an ReleaseDetails and returns the updated ReleaseDetails.
importData(MultipartFile excelFile): importing data from excel sheet
export(String filter, Integer offset, Integer size, String orderBy, String orderType): export the data to excel sheet
downloadTemplate(String fileName): download excel sheet template
auditHistory(int id, Integer limit, Integer skip): return AuditHistory of ReleaseDetails with id and limit and skip
*
**/

@Primary
@RestController
@RequestMapping("/ReleaseDetails")
@Slf4j
public class ReleaseDetailsControllerImpl implements ReleaseDetailsController {

	@Autowired
	private ReleaseDetailsService releaseDetailsService;

	
	@Override
	@Auditable(actionType = ActionType.CREATE, actionName = "CREATE")
	public ReleaseDetails create(ReleaseDetails releaseDetails) {
	return releaseDetailsService.create(releaseDetails);
	}

	@Override
	public Long count(String filter) {
		return releaseDetailsService.count(filter);
	}

	@Override
	public List<ReleaseDetails> search(String filter, Integer offset, Integer size, String orderBy, String orderType) {
		return releaseDetailsService.search(filter, offset, size, orderBy, orderType);
	}

	@Override
	@Auditable(actionType = ActionType.UPDATE, actionName = "UPDATE")
	public ReleaseDetails update(ReleaseDetails releaseDetails) {
		return releaseDetailsService.update(releaseDetails);
	}

	@Override
	public Optional<ReleaseDetails> findById(Integer id) {
		return releaseDetailsService.findById(id);
	}

	@Override
	public List<ReleaseDetails> findAllById(List<Integer> id) {
		return releaseDetailsService.findAllById(id);
	}

	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void deleteById(Integer id) {
	releaseDetailsService.softDelete(id);
	}
  
	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void bulkDelete(List<Integer> list) {
	releaseDetailsService.softBulkDelete(list);
	}

	@Override
	public String importData(MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException  {
		return releaseDetailsService.importData(excelFile);
	}

	@Override
	public ResponseEntity<byte[]> export(String filter, Integer offset, Integer size, String orderBy, String orderType)  throws IOException {
		log.info("going to get list") ;
		List<ReleaseDetails> result = releaseDetailsService.search(filter, 0, 10000000, orderBy, orderType);
		log.info("size of the list is :{},",result.size());
		byte[] workBook = releaseDetailsService.export(result);
		String fileName="ReleaseDetails.xlsx";
		return ResponseBuilder.toResponse(workBook, fileName);
	}
  
	@Override
	public ResponseEntity downloadTemplate(String fileName) throws IOException {
		InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream("templates/reports/"+fileName);
		log.info("resourceAsStream :{}" ,resourceAsStream.available());
		XSSFWorkbook xssfWorkbook = new XSSFWorkbook(resourceAsStream);
		try (ExcelWriter excelWriter = new ExcelWriter(xssfWorkbook)) {
			byte[] workBook = excelWriter.toByteArray();
			return ResponseBuilder.toResponse(workBook, fileName);
		}
	}
    
	@Override
	public String auditHistory(int id, Integer limit, Integer skip) {
		return releaseDetailsService.auditHistory(id,limit,skip);
	} 

	  @Override
      public List<ReleaseDetails> getReleasedByRole(@PathVariable("roleId") int roleId) {
         return releaseDetailsService.findReleasedByRole(roleId);
    } 

	@Override
     public ReleaseDetails getTriggerPipeLine(@PathVariable("id") int id) throws IOException, InterruptedException, KeyManagementException, NoSuchAlgorithmException, KeyStoreException { 
              return releaseDetailsService.triggerPipeLine(id);

}  
}

