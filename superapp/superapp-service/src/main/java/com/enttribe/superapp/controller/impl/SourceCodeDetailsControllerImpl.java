package com.enttribe.superapp.controller.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import com.enttribe.commons.io.excel.ExcelWriter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.checkerframework.checker.units.qual.m;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.enttribe.superapp.controller.SourceCodeDetailsController;
import com.enttribe.superapp.model.ReleaseDetails;
import com.enttribe.superapp.model.SourceCodeDetails;
import com.enttribe.superapp.service.SourceCodeDetailsService;
import com.enttribe.platform.customannotation.annotation.GenericAnnotation; 



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController; 
import org.springframework.security.core.context.SecurityContextHolder;
import java.io.IOException;

/**
*
This class represents the implementation of the SourceCodeDetailsController interface. It is annotated with
the Spring annotations @RestController, @RequestMapping and @Primary to indicate that it is a
Spring-managed bean and should be used as the primary implementation of the SourceCodeDetailsController.
It is also annotated with @Api to provide metadata for the Swagger documentation.
The class also uses Lombok's @Slf4j annotation to automatically generate a logger field named "log"
that is used to log method calls and results.
The class fields include an instance of the SourceCodeDetailsService bean, which is injected by Spring using
the @Autowired annotation.
The class implements the following methods:
create(SourceCodeDetails SourceCodeDetails): creates an SourceCodeDetails and returns the newly created SourceCodeDetails.
count(String filter): returns the number of SourceCodeDetails that match the specified filter.
search(String filter, Integer offset, Integer size, String orderBy, String orderType): returns
a list of SourceCodeDetails that match the specified filter, sorted according to the specified orderBy
and orderType.
update(SourceCodeDetails SourceCodeDetails): updates an SourceCodeDetails and returns the updated SourceCodeDetails.
importData(MultipartFile excelFile): importing data from excel sheet
export(String filter, Integer offset, Integer size, String orderBy, String orderType): export the data to excel sheet
downloadTemplate(String fileName): download excel sheet template
auditHistory(int id, Integer limit, Integer skip): return AuditHistory of SourceCodeDetails with id and limit and skip
*
**/

@Primary
@RestController
@RequestMapping("/SourceCodeDetails")
@Slf4j
public class SourceCodeDetailsControllerImpl implements SourceCodeDetailsController {

	@Autowired
	private SourceCodeDetailsService sourceCodeDetailsService;
	
	@Override
	@Auditable(actionType = ActionType.CREATE, actionName = "CREATE")
	@GenericAnnotation(actionType="CREATE",uniqEntityId="id",annotationName = {"GlobleSearch"}, appName = "SUPERAPP_APP_NAME", entityName = "SourceCodeDetails",globalSearchData="name, applicationKey",searchTitle="tagging")
	public SourceCodeDetails create(SourceCodeDetails sourceCodeDetails) {
	return sourceCodeDetailsService.create(sourceCodeDetails);
	}

	@Override
	public Long count(String filter) {
		return sourceCodeDetailsService.count(filter);
	}

	@Override
	public List<SourceCodeDetails> search(String filter, Integer offset, Integer size, String orderBy, String orderType) {
		return sourceCodeDetailsService.search(filter, offset, size, orderBy, orderType);
	}

	@Override
	@Auditable(actionType = ActionType.UPDATE, actionName = "UPDATE")
	@GenericAnnotation(actionType="UPDATE",uniqEntityId="id",annotationName = {"GlobleSearch"}, appName = "SUPERAPP_APP_NAME", entityName = "SourceCodeDetails",globalSearchData="name, applicationKey",searchTitle="tagging")
	public SourceCodeDetails update(SourceCodeDetails sourceCodeDetails) {
		return sourceCodeDetailsService.update(sourceCodeDetails);
	}

	@Override
	public Optional<SourceCodeDetails> findById(Integer id) {
		return sourceCodeDetailsService.findById(id);
	}

	@Override
	public List<SourceCodeDetails> findAllById(List<Integer> id) {
		return sourceCodeDetailsService.findAllById(id);
	}

	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void deleteById(Integer id) {
	sourceCodeDetailsService.softDelete(id);
	}
  
	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void bulkDelete(List<Integer> list) {
	sourceCodeDetailsService.softBulkDelete(list);
	}

	@Override
	public String importData(MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException  {
		return sourceCodeDetailsService.importData(excelFile);
	}

	@Override
	public ResponseEntity<byte[]> export(String filter, Integer offset, Integer size, String orderBy, String orderType)  throws IOException {
		log.info("going to get list") ;
		List<SourceCodeDetails> result = sourceCodeDetailsService.search(filter, 0, 10000000, orderBy, orderType);
		log.info("size of the list is :{},",result.size());
		byte[] workBook = sourceCodeDetailsService.export(result);
		String fileName="SourceCodeDetails.xlsx";
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
		return sourceCodeDetailsService.auditHistory(id,limit,skip);
	}

	//   @Override
    //   public String getCompileCode(@PathVariable("id") int id) {
    //      return sourceCodeDetailsService.complileCode(id);
    // } 

	@Override
     public String getCompileCode(@PathVariable("id") int id,
                             @RequestParam(value = "runUpgrade", required = false, defaultValue = "false") boolean runUpgrade,
                             @RequestParam(value = "runOutdated", required = false, defaultValue = "false") boolean runOutdated, 
							 @RequestParam(value = "buildInfoId", required = false) Integer buildInfoId)throws IOException, InterruptedException { 
              return sourceCodeDetailsService.complileCode(id, runUpgrade, runOutdated,buildInfoId);
}

}
