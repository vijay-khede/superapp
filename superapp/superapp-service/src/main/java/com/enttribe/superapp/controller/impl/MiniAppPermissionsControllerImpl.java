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
import com.enttribe.superapp.controller.MiniAppPermissionsController;
import com.enttribe.superapp.model.MiniAppPermissions;
import com.enttribe.superapp.service.MiniAppPermissionsService;
import com.enttribe.platform.customannotation.annotation.GenericAnnotation;

/**
*
This class represents the implementation of the MiniAppPermissionsController interface. It is annotated with
the Spring annotations @RestController, @RequestMapping and @Primary to indicate that it is a
Spring-managed bean and should be used as the primary implementation of the MiniAppPermissionsController.
It is also annotated with @Api to provide metadata for the Swagger documentation.
The class also uses Lombok's @Slf4j annotation to automatically generate a logger field named "log"
that is used to log method calls and results.
The class fields include an instance of the MiniAppPermissionsService bean, which is injected by Spring using
the @Autowired annotation.
The class implements the following methods:
create(MiniAppPermissions MiniAppPermissions): creates an MiniAppPermissions and returns the newly created MiniAppPermissions.
count(String filter): returns the number of MiniAppPermissions that match the specified filter.
search(String filter, Integer offset, Integer size, String orderBy, String orderType): returns
a list of MiniAppPermissions that match the specified filter, sorted according to the specified orderBy
and orderType.
update(MiniAppPermissions MiniAppPermissions): updates an MiniAppPermissions and returns the updated MiniAppPermissions.
importData(MultipartFile excelFile): importing data from excel sheet
export(String filter, Integer offset, Integer size, String orderBy, String orderType): export the data to excel sheet
downloadTemplate(String fileName): download excel sheet template
auditHistory(int id, Integer limit, Integer skip): return AuditHistory of MiniAppPermissions with id and limit and skip
*
**/

@Primary
@RestController
@RequestMapping("/MiniAppPermissions")
@Slf4j
public class MiniAppPermissionsControllerImpl implements MiniAppPermissionsController {

	@Autowired
	private MiniAppPermissionsService miniAppPermissionsService;
	
	@Override
	@Auditable(actionType = ActionType.CREATE, actionName = "CREATE")
	@GenericAnnotation(actionType="CREATE",uniqEntityId="id",annotationName = {"GlobleSearch"}, appName = "SUPERAPP_APP_NAME", entityName = "MiniAppPermissions",globalSearchData="name, applicationKey",searchTitle="tagging")
	public MiniAppPermissions create(MiniAppPermissions miniAppPermissions) {
	return miniAppPermissionsService.create(miniAppPermissions);
	}

	@Override
	public Long count(String filter) {
		return miniAppPermissionsService.count(filter);
	}

	@Override
	public List<MiniAppPermissions> search(String filter, Integer offset, Integer size, String orderBy, String orderType) {
		return miniAppPermissionsService.search(filter, offset, size, orderBy, orderType);
	}

	@Override
	@Auditable(actionType = ActionType.UPDATE, actionName = "UPDATE")
	@GenericAnnotation(actionType="UPDATE",uniqEntityId="id",annotationName = {"GlobleSearch"}, appName = "SUPERAPP_APP_NAME", entityName = "MiniAppPermissions",globalSearchData="name, applicationKey",searchTitle="tagging")
	public MiniAppPermissions update(MiniAppPermissions miniAppPermissions) {
		return miniAppPermissionsService.update(miniAppPermissions);
	}

	@Override
	public Optional<MiniAppPermissions> findById(Integer id) {
		return miniAppPermissionsService.findById(id);
	}

	@Override
	public List<MiniAppPermissions> findAllById(List<Integer> id) {
		return miniAppPermissionsService.findAllById(id);
	}

	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void deleteById(Integer id) {
	miniAppPermissionsService.softDelete(id);
	}
  
	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void bulkDelete(List<Integer> list) {
	miniAppPermissionsService.softBulkDelete(list);
	}

	@Override
	public String importData(MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException  {
		return miniAppPermissionsService.importData(excelFile);
	}

	@Override
	public ResponseEntity<byte[]> export(String filter, Integer offset, Integer size, String orderBy, String orderType)  throws IOException {
		log.info("going to get list") ;
		List<MiniAppPermissions> result = miniAppPermissionsService.search(filter, 0, 10000000, orderBy, orderType);
		log.info("size of the list is :{},",result.size());
		byte[] workBook = miniAppPermissionsService.export(result);
		String fileName="MiniAppPermissions.xlsx";
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
		return miniAppPermissionsService.auditHistory(id,limit,skip);
	}

}
