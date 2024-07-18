package com.enttribe.superapp.controller;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
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
import com.enttribe.superapp.model.ReleaseDetails;
import com.enttribe.superapp.util.APIConstants;

/**
 * 
 * The interface ReleaseDetailsController defines several endpoints that can be accessed using the Spring Web's FeignClient to interact with the service related to ReleaseDetails.
FeignClient annotation is used to create a client-side load balancer, in this case to call the Employee service, and the url attribute is populated with the {ReleaseDetails.url} property.
ApiOperation annotation describes the operation the endpoint performs and details the response, authorizations and other information about the endpoint.
It defines the following endpoints:
create(@Valid @RequestBody  ReleaseDetails) : creates a new ReleaseDetails with the given request body and returns the created ReleaseDetails.
count(@RequestParam(name = APIConstants.QUERY, required = false) String filter) : returns the count of ReleaseDetails with the RSQL query in the filter parameter.
search(@RequestParam(name = APIConstants.QUERY, required = false) String filter, @Valid @RequestParam(name = APIConstants.OFFSET, required = true) Integer offset, @Valid @RequestParam(name = APIConstants.SIZE, required = true) Integer size, @RequestParam(name = APIConstants.SORT, required = false) String sort): searches for the list of ReleaseDetails based on the RSQL filter and returns the list of ReleaseDetails matching the criteria with the pagination and sorting information.
findById(@PathVariable("id") Long id) : searches for the ReleaseDetails by ID and returns the ReleaseDetails if found.
update(@PathVariable("id") Long id, @Valid @RequestBody Employee employee) : updates the existing ReleaseDetails with the given id with the request body and returns the updated ReleaseDetails.
delete(@PathVariable("id") Long id) : deletes the ReleaseDetails with the given id and returns the deleted ReleaseDetails.
It also includes some other annotations like @ApiResponse, @Parameter, @Authorization, @AuthorizationScope which are used to provide more details about the endpoint.
 * 
 * */


@ResponseBody
@FeignClient(name = "ReleaseDetailsController", url = "${superapp.url}", path = "/ReleaseDetails", primary = false)
public interface ReleaseDetailsController {

  @Operation(summary = "Creates a new ReleaseDetails",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = {"ROLE_API_HOSTINGDETAILS_WRITE"})})
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @PostMapping(path = "create", consumes = MediaType.APPLICATION_JSON_VALUE)
  ReleaseDetails create(@Valid @RequestBody ReleaseDetails releaseDetails);

  @Operation(summary = "To get the count with RSQL supported filter",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_READ"})})
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "count")
  Long count(@RequestParam(name = APIConstants.QUERY, required = false) String filter);
 
  @Operation(summary = "To get the list of ReleaseDetails with RSQL supported filter",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = {"ROLE_API_HOSTINGDETAILS_READ"})})
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "search")

  List<ReleaseDetails> search(
  	  @RequestParam(name = APIConstants.QUERY, required = false) String filter,
      @Valid @RequestParam(name = APIConstants.OFFSET, required = true) Integer offset,
      @Valid @RequestParam(name = APIConstants.SIZE, required = true) Integer size,
      @RequestParam(name = APIConstants.ORDER_BY, required = false) String orderBy,
      @RequestParam(name = APIConstants.ORDER_TYPE, required = false) String orderType);

  @Operation(summary = "To update the given ReleaseDetails",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_WRITE"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @PostMapping(path = "update", consumes = MediaType.APPLICATION_JSON_VALUE)
  ReleaseDetails update(@Valid @RequestBody ReleaseDetails releaseDetails);

  @Operation(summary = "To delete the given ReleaseDetails by Id",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_WRITE"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "deleteById")
  void deleteById(@Valid @RequestParam(name = APIConstants.ID, required = true) Integer id);
  
  @Operation(summary = "To delete all the ReleaseDetails",  security = {@SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_WRITE"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @PostMapping(path = "deleteAll")
  void bulkDelete(@Valid @Parameter(name = APIConstants.ID, required = true) @RequestBody(required = true) List<Integer> list);

  @Operation(summary = "To get ReleaseDetails by Id",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_READ"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "findById")
  Optional<ReleaseDetails> findById(@Valid @RequestParam(name = APIConstants.ID, required = true) Integer id);
  
  @Operation(summary = "To get all ReleaseDetails by given Ids",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_READ"}) })
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "findAllById")
  List<ReleaseDetails> findAllById(@Valid @RequestParam(name = APIConstants.ID, required = true) List<Integer> id);
  
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @GetMapping(path = "auditHistory/{id}")
  String auditHistory(
  	  @PathVariable(value = "id")  int id,@Valid @RequestParam(name = APIConstants.LIMIT, required = true) Integer limit,
  	  @Valid @RequestParam(name = APIConstants.SKIP, required = true) Integer skip);
		      
  @Operation(summary = "Import Data for ReleaseDetails",  security = {@SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = {"ROLE_API_HOSTINGDETAILS_WRITE"})})
  @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
  @PostMapping(path ="importData", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  String importData(@RequestParam(required = true, name = "file") MultipartFile excelFile) throws IOException,InstantiationException, ClassNotFoundException ;		      
  
  @Operation(summary = "To export the list of ReleaseDetails with RSQL supported filter",  security = { @SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = { "ROLE_API_HOSTINGDETAILS_READ"}) })
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
  
  @Operation(summary = "To get released mini-apps by role ID", security = {@SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = {"ROLE_API_HOSTINGDETAILS_READ"})})
    @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
    @GetMapping(path = "releasedByRole/{roleId}") 
    List<ReleaseDetails> getReleasedByRole(@PathVariable("roleId") int roleId); 

    @Operation(summary = "To get pipeLine response by ID", security = {@SecurityRequirement(name = APIConstants.DEFAULT_SCHEME, scopes = {"ROLE_API_HOSTINGDETAILS_READ"})})
    @ApiResponse(responseCode = APIConstants.SUCCESS_CODE, description = APIConstants.SUCCESS_CODE_MSG)
    @GetMapping(path = "triggerPipeLine/{id}")
    ReleaseDetails getTriggerPipeLine(@PathVariable("id") int id) throws IOException, InterruptedException, KeyManagementException, NoSuchAlgorithmException, KeyStoreException ;
  
}

