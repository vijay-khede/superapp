package com.enttribe.superapp.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PathVariable;
import io.swagger.v3.oas.annotations.Parameter;
import com.enttribe.superapp.model.BuildInfo;
import com.enttribe.superapp.util.APIConstants;

/**
 * 
 * The interface BuildInfoController defines several endpoints that can be accessed using the Spring Web's FeignClient to interact with the service related to BuildInfo.
FeignClient annotation is used to create a client-side load balancer, in this case to call the Employee service, and the url attribute is populated with the {BuildInfo.url} property.
ApiOperation annotation describes the operation the endpoint performs and details the response, authorizations and other information about the endpoint.
It defines the following endpoints:
create(@Valid @RequestBody  BuildInfo) : creates a new BuildInfo with the given request body and returns the created BuildInfo.
count(@RequestParam(name = APIConstants.QUERY, required = false) String filter) : returns the count of BuildInfo with the RSQL query in the filter parameter.
search(@RequestParam(name = APIConstants.QUERY, required = false) String filter, @Valid @RequestParam(name = APIConstants.OFFSET, required = true) Integer offset, @Valid @RequestParam(name = APIConstants.SIZE, required = true) Integer size, @RequestParam(name = APIConstants.SORT, required = false) String sort): searches for the list of BuildInfo based on the RSQL filter and returns the list of BuildInfo matching the criteria with the pagination and sorting information.
findById(@PathVariable("id") Long id) : searches for the BuildInfo by ID and returns the BuildInfo if found.
update(@PathVariable("id") Long id, @Valid @RequestBody Employee employee) : updates the existing BuildInfo with the given id with the request body and returns the updated BuildInfo.
delete(@PathVariable("id") Long id) : deletes the BuildInfo with the given id and returns the deleted BuildInfo.
It also includes some other annotations like @ApiResponse, @Parameter, @Authorization, @AuthorizationScope which are used to provide more details about the endpoint.
 * 
 * */


@ResponseBody
@FeignClient(name = "BuildInfoController", url = "${superapp.url}", path = "/BuildInfo", primary = false)
public interface BuildInfoController {

  @Operation(summary = "Creates a new BuildInfo",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = {"ROLE_API_HOSTINGDETAILS_WRITE"})})
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @PostMapping(path = "create", consumes = MediaType.APPLICATION_JSON_VALUE)
  BuildInfo create(@Valid @RequestBody BuildInfo buildInfo);

  @Operation(summary = "To get the count with RSQL supported filter",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_READ"})})
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "count")
  Long count(@RequestParam(name = APIConstants.QUERY, required = false) String filter);

  @Operation(summary = "To get the list of BuildInfo with RSQL supported filter",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = {"ROLE_API_HOSTINGDETAILS_READ"})})
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "search")
  List<BuildInfo> search(
  	  @RequestParam(name = APIConstants.QUERY, required = false) String filter,
      @Valid @RequestParam(name = APIConstants.OFFSET, required = true) Integer offset,
      @Valid @RequestParam(name = APIConstants.SIZE, required = true) Integer size,
      @RequestParam(name = APIConstants.ORDER_BY, required = false) String orderBy,
      @RequestParam(name = APIConstants.ORDER_TYPE, required = false) String orderType);

  @Operation(summary = "To update the given BuildInfo",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_WRITE"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @PostMapping(path = "update", consumes = MediaType.APPLICATION_JSON_VALUE)
  BuildInfo update(@Valid @RequestBody BuildInfo buildInfo);

  @Operation(summary = "To delete the given BuildInfo by Id",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_WRITE"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "deleteById")
  void deleteById(@Valid @RequestParam(name = APIConstants.ID, required = true) Integer id);
  
  @Operation(summary = "To delete all the BuildInfo",  security = {@SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_WRITE"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @PostMapping(path = "deleteAll")
  void bulkDelete(@Valid @Parameter(name = APIConstants.ID, required = true) @RequestBody(required = true) List<Integer> list);

  @Operation(summary = "To get BuildInfo by Id",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_READ"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "findById")
  Optional<BuildInfo> findById(@Valid @RequestParam(name = APIConstants.ID, required = true) Integer id);

  @Operation(summary = "To get all BuildInfo by given Ids",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_READ"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "findAllById")
  List<BuildInfo> findAllById(@Valid @RequestParam(name = APIConstants.ID, required = true) List<Integer> id);

  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "auditHistory/{id}")
  String auditHistory(
  	  @PathVariable(value = "id")  int id,@Valid @RequestParam(name = APIConstants.LIMIT, required = true) Integer limit,
  	  @Valid @RequestParam(name = APIConstants.SKIP, required = true) Integer skip);
		      
  @Operation(summary = "Import Data for BuildInfo",  security = {@SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = {"ROLE_API_HOSTINGDETAILS_WRITE"})})
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @PostMapping(path ="importData", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  String importData(@RequestParam(required = true, name = "file") MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException ;		      
  
  @Operation(summary = "To export the list of BuildInfo with RSQL supported filter",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_READ"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "export",produces=MediaType.APPLICATION_OCTET_STREAM_VALUE)
  ResponseEntity<byte[]> export(@RequestParam(name = APIConstants.QUERY, required =false) String filter, @RequestParam(name = APIConstants.OFFSET, required = false) Integer offset,
  	  @RequestParam(name = APIConstants.SIZE, required = false) Integer size,      
  	  @RequestParam(name = APIConstants.ORDER_BY, required = false) String orderBy,
      @RequestParam(name = APIConstants.ORDER_TYPE, required = false) String orderType) throws IOException;
      
  @Operation(summary = "To download the template ",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_READ"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "downloadTemplate", produces=MediaType.APPLICATION_OCTET_STREAM_VALUE)
  ResponseEntity<byte[]> downloadTemplate(@RequestParam(name ="fileName", required = true) String fileName) throws IOException; 

}

