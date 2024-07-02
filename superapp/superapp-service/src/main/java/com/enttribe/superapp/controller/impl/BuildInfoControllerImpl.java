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
import com.enttribe.product.audit.utils.ActionType;
import com.enttribe.product.audit.utils.Auditable;
import lombok.extern.slf4j.Slf4j;
import com.enttribe.superapp.controller.BuildInfoController;
import com.enttribe.superapp.model.BuildInfo;
import com.enttribe.superapp.service.BuildInfoService;

/**
*
This class represents the implementation of the BuildInfoController interface. It is annotated with
the Spring annotations @RestController, @RequestMapping and @Primary to indicate that it is a
Spring-managed bean and should be used as the primary implementation of the BuildInfoController.
It is also annotated with @Api to provide metadata for the Swagger documentation.
The class also uses Lombok's @Slf4j annotation to automatically generate a logger field named "log"
that is used to log method calls and results.
The class fields include an instance of the BuildInfoService bean, which is injected by Spring using
the @Autowired annotation.
The class implements the following methods:
create(BuildInfo BuildInfo): creates an BuildInfo and returns the newly created BuildInfo.
count(String filter): returns the number of BuildInfo that match the specified filter.
search(String filter, Integer offset, Integer size, String orderBy, String orderType): returns
a list of BuildInfo that match the specified filter, sorted according to the specified orderBy
and orderType.
update(BuildInfo BuildInfo): updates an BuildInfo and returns the updated BuildInfo.
importData(MultipartFile excelFile): importing data from excel sheet
export(String filter, Integer offset, Integer size, String orderBy, String orderType): export the data to excel sheet
downloadTemplate(String fileName): download excel sheet template
auditHistory(int id, Integer limit, Integer skip): return AuditHistory of BuildInfo with id and limit and skip
*
**/

@Primary
@RestController
@RequestMapping("/BuildInfo")
@Slf4j
public class BuildInfoControllerImpl implements BuildInfoController {

	@Autowired
	private BuildInfoService buildInfoService;
    
	@Override
	@Auditable(actionType = ActionType.CREATE, actionName = "CREATE")
	public BuildInfo create(BuildInfo buildInfo) {
	return buildInfoService.create(buildInfo);
	}
    
	@Override
	public Long count(String filter) {
		return buildInfoService.count(filter);
	}
    
	@Override
	public List<BuildInfo> search(String filter, Integer offset, Integer size, String orderBy, String orderType) {
		return buildInfoService.search(filter, offset, size, orderBy, orderType);
	}
    
	@Override
	@Auditable(actionType = ActionType.UPDATE, actionName = "UPDATE")
	public BuildInfo update(BuildInfo buildInfo) {
		return buildInfoService.update(buildInfo);
	}
    
	@Override
	public Optional<BuildInfo> findById(Integer id) {
		return buildInfoService.findById(id);
	}
    
	@Override
	public List<BuildInfo> findAllById(List<Integer> id) {
		return buildInfoService.findAllById(id);
	}
    
	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void deleteById(Integer id) {
	buildInfoService.softDelete(id);
	}
    
	@Override
	@Auditable(actionType = ActionType.DELETE, actionName = "DELETE")
	public void bulkDelete(List<Integer> list) {
	buildInfoService.softBulkDelete(list);
	}
    
	@Override
	public String importData(MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException  {
		return buildInfoService.importData(excelFile);
	}

	@Override
	public ResponseEntity<byte[]> export(String filter, Integer offset, Integer size, String orderBy, String orderType)  throws IOException {
		log.info("going to get list") ;
		List<BuildInfo> result = buildInfoService.search(filter, 0, 10000000, orderBy, orderType);
		log.info("size of the list is :{},",result.size());
		byte[] workBook = buildInfoService.export(result);
		String fileName="BuildInfo.xlsx";
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
		return buildInfoService.auditHistory(id,limit,skip);
	}

}
