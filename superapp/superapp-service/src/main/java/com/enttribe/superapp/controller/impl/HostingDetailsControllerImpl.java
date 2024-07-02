package com.enttribe.superapp.controller.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import com.enttribe.commons.io.excel.ExcelWriter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import com.enttribe.commons.spring.rest.ResponseBuilder;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotEmpty;
import com.enttribe.product.audit.utils.ActionType;
import com.enttribe.product.audit.utils.Auditable;
import org.hibernate.envers.Audited;
import lombok.extern.slf4j.Slf4j;
import com.enttribe.superapp.controller.HostingDetailsController;
import com.enttribe.superapp.model.HostingDetails;
import com.enttribe.superapp.service.HostingDetailsService;

/**
*
This class represents the implementation of the HostingDetailsController interface. It is annotated with
the Spring annotations @RestController, @RequestMapping and @Primary to indicate that it is a
Spring-managed bean and should be used as the primary implementation of the HostingDetailsController.
It is also annotated with @Api to provide metadata for the Swagger documentation.
The class also uses Lombok's @Slf4j annotation to automatically generate a logger field named "log"
that is used to log method calls and results.
The class fields include an instance of the HostingDetailsService bean, which is injected by Spring using
the @Autowired annotation.
The class implements the following methods:
create(HostingDetails HostingDetails): creates an HostingDetails and returns the newly created HostingDetails.
count(String filter): returns the number of HostingDetails that match the specified filter.
search(String filter, Integer offset, Integer size, String orderBy, String orderType): returns
a list of HostingDetails that match the specified filter, sorted according to the specified orderBy
and orderType.
update(HostingDetails HostingDetails): updates an HostingDetails and returns the updated HostingDetails.
importData(MultipartFile excelFile): importing data from excel sheet
export(String filter, Integer offset, Integer size, String orderBy, String orderType): export the data to excel sheet
downloadTemplate(String fileName): download excel sheet template
auditHistory(int id, Integer limit, Integer skip): return AuditHistory of HostingDetails with id and limit and skip
*
**/

@Primary
@RestController
@RequestMapping("/HostingDetails")
@Slf4j
public class HostingDetailsControllerImpl implements HostingDetailsController {

	@Autowired
	private HostingDetailsService hostingDetailsService;

	
	@Override
	@Auditable(actionType = ActionType.CREATE, actionName = "CREATE")
	public HostingDetails create(HostingDetails hostingDetails) {
	return hostingDetailsService.create(hostingDetails);
	}

	@Override
	public Long count(String filter) {
		return hostingDetailsService.count(filter);
	}

	@Override
	public List<HostingDetails> search(String filter, Integer offset, Integer size, String orderBy, String orderType) {
		return hostingDetailsService.search(filter, offset, size, orderBy, orderType);
	}

	@Override
	@Auditable(actionType = ActionType.UPDATE, actionName = "UPDATE")
	public HostingDetails update(HostingDetails hostingDetails) {
		return hostingDetailsService.update(hostingDetails);
	}

	@Override
	public Optional<HostingDetails> findById(Integer id) {
		return hostingDetailsService.findById(id);
	}

	@Override
	public List<HostingDetails> findAllById(List<Integer> id) {
		return hostingDetailsService.findAllById(id);
	}

	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void deleteById(Integer id) {
	hostingDetailsService.softDelete(id);
	}
  
	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void bulkDelete(List<Integer> list) {
	hostingDetailsService.softBulkDelete(list);
	}

	@Override
	public String importData(MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException  {
		return hostingDetailsService.importData(excelFile);
	}

	@Override
	public ResponseEntity<byte[]> export(String filter, Integer offset, Integer size, String orderBy, String orderType)  throws IOException {
		log.info("going to get list") ;
		List<HostingDetails> result = hostingDetailsService.search(filter, 0, 10000000, orderBy, orderType);
		log.info("size of the list is :{},",result.size());
		byte[] workBook = hostingDetailsService.export(result);
		String fileName="HostingDetails.xlsx";
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
		return hostingDetailsService.auditHistory(id,limit,skip);
	}

}
