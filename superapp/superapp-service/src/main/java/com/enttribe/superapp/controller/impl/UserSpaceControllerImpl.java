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
import com.enttribe.superapp.controller.UserSpaceController;
import com.enttribe.superapp.model.UserSpace;
import com.enttribe.superapp.service.UserSpaceService;
import com.enttribe.platform.customannotation.annotation.GenericAnnotation;

/**
*
This class represents the implementation of the UserSpaceController interface. It is annotated with
the Spring annotations @RestController, @RequestMapping and @Primary to indicate that it is a
Spring-managed bean and should be used as the primary implementation of the UserSpaceController.
It is also annotated with @Api to provide metadata for the Swagger documentation.
The class also uses Lombok's @Slf4j annotation to automatically generate a logger field named "log"
that is used to log method calls and results.
The class fields include an instance of the UserSpaceService bean, which is injected by Spring using
the @Autowired annotation.
The class implements the following methods:
create(UserSpace UserSpace): creates an UserSpace and returns the newly created UserSpace.
count(String filter): returns the number of UserSpace that match the specified filter.
search(String filter, Integer offset, Integer size, String orderBy, String orderType): returns
a list of UserSpace that match the specified filter, sorted according to the specified orderBy
and orderType.
update(UserSpace UserSpace): updates an UserSpace and returns the updated UserSpace.
importData(MultipartFile excelFile): importing data from excel sheet
export(String filter, Integer offset, Integer size, String orderBy, String orderType): export the data to excel sheet
downloadTemplate(String fileName): download excel sheet template
auditHistory(int id, Integer limit, Integer skip): return AuditHistory of UserSpace with id and limit and skip
*
**/

@Primary
@RestController
@RequestMapping("/UserSpace")
@Slf4j
public class UserSpaceControllerImpl implements UserSpaceController {

	@Autowired
	private UserSpaceService userSpaceService;
	
	@Override
	@Auditable(actionType = ActionType.CREATE, actionName = "CREATE")
	@GenericAnnotation(actionType="CREATE",uniqEntityId="id",annotationName = {"GlobleSearch"}, appName = "SUPERAPP_APP_NAME", entityName = "UserSpace",globalSearchData="name, applicationKey",searchTitle="tagging")
	public UserSpace create(UserSpace userSpace) {
	return userSpaceService.create(userSpace);
	}

	@Override
	public Long count(String filter) {
		return userSpaceService.count(filter);
	}

	@Override
	public List<UserSpace> search(String filter, Integer offset, Integer size, String orderBy, String orderType) {
		return userSpaceService.search(filter, offset, size, orderBy, orderType);
	}

	@Override
	@Auditable(actionType = ActionType.UPDATE, actionName = "UPDATE")
	@GenericAnnotation(actionType="UPDATE",uniqEntityId="id",annotationName = {"GlobleSearch"}, appName = "SUPERAPP_APP_NAME", entityName = "UserSpace",globalSearchData="name, applicationKey",searchTitle="tagging")
	public UserSpace update(UserSpace userSpace) {
		return userSpaceService.update(userSpace);
	}

	@Override
	public Optional<UserSpace> findById(Integer id) {
		return userSpaceService.findById(id);
	}

	@Override
	public List<UserSpace> findAllById(List<Integer> id) {
		return userSpaceService.findAllById(id);
	}

	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void deleteById(Integer id) {
	userSpaceService.softDelete(id);
	}
  
	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void bulkDelete(List<Integer> list) {
	userSpaceService.softBulkDelete(list);
	}

	@Override
	public String importData(MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException  {
		return userSpaceService.importData(excelFile);
	}

	@Override
	public ResponseEntity<byte[]> export(String filter, Integer offset, Integer size, String orderBy, String orderType)  throws IOException {
		log.info("going to get list") ;
		List<UserSpace> result = userSpaceService.search(filter, 0, 10000000, orderBy, orderType);
		log.info("size of the list is :{},",result.size());
		byte[] workBook = userSpaceService.export(result);
		String fileName="UserSpace.xlsx";
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
		return userSpaceService.auditHistory(id,limit,skip);
	}

}
