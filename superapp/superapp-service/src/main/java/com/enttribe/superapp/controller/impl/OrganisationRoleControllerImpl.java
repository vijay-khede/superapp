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
import com.enttribe.superapp.controller.OrganisationRoleController;
import com.enttribe.superapp.model.OrganisationRole;
import com.enttribe.superapp.service.OrganisationRoleService;
import com.enttribe.platform.customannotation.annotation.GenericAnnotation;

/**
*
This class represents the implementation of the OrganisationRoleController interface. It is annotated with
the Spring annotations @RestController, @RequestMapping and @Primary to indicate that it is a
Spring-managed bean and should be used as the primary implementation of the OrganisationRoleController.
It is also annotated with @Api to provide metadata for the Swagger documentation.
The class also uses Lombok's @Slf4j annotation to automatically generate a logger field named "log"
that is used to log method calls and results.
The class fields include an instance of the OrganisationRoleService bean, which is injected by Spring using
the @Autowired annotation.
The class implements the following methods:
create(OrganisationRole OrganisationRole): creates an OrganisationRole and returns the newly created OrganisationRole.
count(String filter): returns the number of OrganisationRole that match the specified filter.
search(String filter, Integer offset, Integer size, String orderBy, String orderType): returns
a list of OrganisationRole that match the specified filter, sorted according to the specified orderBy
and orderType.
update(OrganisationRole OrganisationRole): updates an OrganisationRole and returns the updated OrganisationRole.
importData(MultipartFile excelFile): importing data from excel sheet
export(String filter, Integer offset, Integer size, String orderBy, String orderType): export the data to excel sheet
downloadTemplate(String fileName): download excel sheet template
auditHistory(int id, Integer limit, Integer skip): return AuditHistory of OrganisationRole with id and limit and skip
*
**/

@Primary
@RestController
@RequestMapping("/OrganisationRole")
@Slf4j
public class OrganisationRoleControllerImpl implements OrganisationRoleController {

	@Autowired
	private OrganisationRoleService organisationRoleService;
	
	@Override
	@Auditable(actionType = ActionType.CREATE, actionName = "CREATE")
	@GenericAnnotation(actionType="CREATE",uniqEntityId="id",annotationName = {"GlobleSearch"}, appName = "SUPERAPP_APP_NAME", entityName = "OrganisationRole",globalSearchData="name, applicationKey",searchTitle="tagging")
	public OrganisationRole create(OrganisationRole organisationRole) {
	return organisationRoleService.create(organisationRole); 
	}

	@Override
	public Long count(String filter) {
		return organisationRoleService.count(filter);
	}

	@Override
	public List<OrganisationRole> search(String filter, Integer offset, Integer size, String orderBy, String orderType) {
		return organisationRoleService.search(filter, offset, size, orderBy, orderType);
	}

	@Override
	@Auditable(actionType = ActionType.UPDATE, actionName = "UPDATE")
	@GenericAnnotation(actionType="UPDATE",uniqEntityId="id",annotationName = {"GlobleSearch"}, appName = "SUPERAPP_APP_NAME", entityName = "OrganisationRole",globalSearchData="name, applicationKey",searchTitle="tagging")
	public OrganisationRole update(OrganisationRole organisationRole) {
		return organisationRoleService.update(organisationRole);
	}

	@Override
	public Optional<OrganisationRole> findById(Integer id) {
		return organisationRoleService.findById(id);
	}

	@Override
	public List<OrganisationRole> findAllById(List<Integer> id) {
		return organisationRoleService.findAllById(id);
	}

	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void deleteById(Integer id) {
	organisationRoleService.softDelete(id);
	}
  
	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void bulkDelete(List<Integer> list) {
	organisationRoleService.softBulkDelete(list);
	}

	@Override
	public String importData(MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException  {
		return organisationRoleService.importData(excelFile);
	}

	@Override
	public ResponseEntity<byte[]> export(String filter, Integer offset, Integer size, String orderBy, String orderType)  throws IOException {
		log.info("going to get list") ;
		List<OrganisationRole> result = organisationRoleService.search(filter, 0, 10000000, orderBy, orderType);
		log.info("size of the list is :{},",result.size());
		byte[] workBook = organisationRoleService.export(result);
		String fileName="OrganisationRole.xlsx";
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
		return organisationRoleService.auditHistory(id,limit,skip);
	}

}
