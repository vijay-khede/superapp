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
import com.enttribe.superapp.controller.BuildLogInfoController;
import com.enttribe.superapp.model.BuildLogInfo;
import com.enttribe.superapp.service.BuildLogInfoService;

/**
*
This class represents the implementation of the BuildLogInfoController interface. It is annotated with
the Spring annotations @RestController, @RequestMapping and @Primary to indicate that it is a
Spring-managed bean and should be used as the primary implementation of the BuildLogInfoController.
It is also annotated with @Api to provide metadata for the Swagger documentation.
The class also uses Lombok's @Slf4j annotation to automatically generate a logger field named "log"
that is used to log method calls and results.
The class fields include an instance of the BuildLogInfoService bean, which is injected by Spring using
the @Autowired annotation.
The class implements the following methods:
create(BuildLogInfo BuildLogInfo): creates an BuildLogInfo and returns the newly created BuildLogInfo.
count(String filter): returns the number of BuildLogInfo that match the specified filter.
search(String filter, Integer offset, Integer size, String orderBy, String orderType): returns
a list of BuildLogInfo that match the specified filter, sorted according to the specified orderBy
and orderType.
update(BuildLogInfo BuildLogInfo): updates an BuildLogInfo and returns the updated BuildLogInfo.
importData(MultipartFile excelFile): importing data from excel sheet
export(String filter, Integer offset, Integer size, String orderBy, String orderType): export the data to excel sheet
downloadTemplate(String fileName): download excel sheet template
auditHistory(int id, Integer limit, Integer skip): return AuditHistory of BuildLogInfo with id and limit and skip
*
**/

@Primary
@RestController
@RequestMapping("/BuildLogInfo")
@Slf4j
public class BuildLogInfoControllerImpl implements BuildLogInfoController {

	@Autowired
	private BuildLogInfoService buildLogInfoService;

	
	@Override
	@Auditable(actionType = ActionType.CREATE, actionName = "CREATE")
	public BuildLogInfo create(BuildLogInfo buildLogInfo) {
	return buildLogInfoService.create(buildLogInfo);
	}

	@Override
	public Long count(String filter) {
		return buildLogInfoService.count(filter);
	}

	@Override
	public List<BuildLogInfo> search(String filter, Integer offset, Integer size, String orderBy, String orderType) {
		return buildLogInfoService.search(filter, offset, size, orderBy, orderType);
	}

	@Override
	@Auditable(actionType = ActionType.UPDATE, actionName = "UPDATE")
	public BuildLogInfo update(BuildLogInfo buildLogInfo) {
		return buildLogInfoService.update(buildLogInfo);
	}

	@Override
	public Optional<BuildLogInfo> findById(Integer id) {
		return buildLogInfoService.findById(id);
	}

	@Override
	public List<BuildLogInfo> findAllById(List<Integer> id) {
		return buildLogInfoService.findAllById(id);
	}

	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void deleteById(Integer id) {
	buildLogInfoService.softDelete(id);
	}
  
	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void bulkDelete(List<Integer> list) {
	buildLogInfoService.softBulkDelete(list);
	}

	@Override
	public String importData(MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException  {
		return buildLogInfoService.importData(excelFile);
	}

	@Override
	public ResponseEntity<byte[]> export(String filter, Integer offset, Integer size, String orderBy, String orderType)  throws IOException {
		log.info("going to get list") ;
		List<BuildLogInfo> result = buildLogInfoService.search(filter, 0, 10000000, orderBy, orderType);
		log.info("size of the list is :{},",result.size());
		byte[] workBook = buildLogInfoService.export(result);
		String fileName="BuildLogInfo.xlsx";
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
		return buildLogInfoService.auditHistory(id,limit,skip);
	}

}
