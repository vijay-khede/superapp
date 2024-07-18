package com.enttribe.superapp.service.impl;

import org.springframework.stereotype.Service;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.poi.hpsf.NoFormatIDException;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.enttribe.commons.io.excel.Excel;
import com.enttribe.commons.io.excel.ExcelRow;
import com.enttribe.commons.io.excel.ExcelWriter;
import com.enttribe.core.generic.utils.ApplicationContextProvider;
import com.enttribe.core.generic.utils.ConfigUtil;
import com.enttribe.orchestrator.dto.MessageIntegrationWrapper;
import com.enttribe.orchestrator.dto.MessageIntegrationWrapper.Event;
import com.enttribe.orchestrator.utility.controller.WorkflowActionsController;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import java.util.Optional;
import java.util.stream.Collectors;

import com.enttribe.superapp.repository.ReleaseDetailsRepository;
import com.enttribe.superapp.integration.service.DocumentIntegrationService;
import com.enttribe.superapp.model.MiniAppPermissions;
import com.enttribe.superapp.model.MiniappDetails;
import com.enttribe.superapp.model.OrganisationRole;
import com.enttribe.superapp.model.ReleaseDetails;
import com.enttribe.superapp.repository.generic.GenericRepository;
import com.enttribe.superapp.service.ReleaseDetailsService;
import com.enttribe.superapp.service.generic.AbstractService;
import com.enttribe.superapp.util.APIConstants;
import com.enttribe.superapp.util.report.ExcelUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.NameValuePair;
import org.apache.http.util.EntityUtils;

import org.apache.http.ssl.SSLContexts;
import javax.net.ssl.*; 
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
/**
 *
 * This is a class named "ReleaseDetailsServiceImpl" which is located in the
 * package " com.enttribe.superapp.service.impl", It appears to be an
 * implementation of the "ReleaseDetailsService" interface and it extends the
 * "AbstractService" class, which seems to be a generic class for handling CRUD
 * operations for entities. This class is annotated with @Service, indicating
 * that it is a Spring Service bean.
 * This class is using Lombok's @Slf4j annotation which will automatically
 * generate an Slf4j based logger instance, so it is using the Slf4j API for
 * logging.
 * The class has a constructor which takes a single parameter of
 * GenericRepository ReleaseDetails and is used to call the superclass's
 * constructor.
 * This class have one public method public byte[] export(List of ReleaseDetails
 * ReleaseDetails) for exporting the ReleaseDetails data into excel file by
 * reading the template and mapping the ReleaseDetails details into it.
 * It's using Apache POI library for reading and writing excel files, and has
 * methods for parsing the json files for column names and identities , and it
 * also used 'ExcelUtils' for handling the excel operations.
 * It also uses 'ApplicationContextProvider' from
 * 'com.enttribe.core.generic.utils' and 'APIConstants' from
 * 'com.enttribe.superapp.util'
 *
 */

@Service
@Slf4j
public class ReleaseDetailsServiceImpl extends AbstractService<ReleaseDetails> implements ReleaseDetailsService {

	/**
	 * @param repository The GenericRepository used to perform CRUD operations for
	 *                   ReleaseDetails entities.
	 */
	public ReleaseDetailsServiceImpl(GenericRepository<ReleaseDetails> repository) {
		super(repository, ReleaseDetails.class);
	}

	private static final String ENTITY_NAME = "ReleaseDetails";

	@Autowired
	private ReleaseDetailsRepository releaseDetailsRepository;

	/**
	 * This method is used to export the given list of ReleaseDetails objects into
	 * an excel file.
	 * It reads an excel template 'ReleaseDetails.xlsx' from the resource folder
	 * 'templates/reports'
	 * and maps the ReleaseDetails data onto the template and returns the generated
	 * excel file in the form of a byte array.
	 * param ReleaseDetails - List of ReleaseDetails objects to be exported
	 * 
	 * @return byte[] - The generated excel file in the form of a byte array
	 * @throws IOException - When the template file is not found or there is an
	 *                     error reading the file
	 */ 
     
	@Override
	public byte[] export(List<ReleaseDetails> releaseDetails) throws IOException {
		InputStream resourceAsStream = this.getClass().getClassLoader()
				.getResourceAsStream("templates/reports/ReleaseDetails.xlsx");
		XSSFWorkbook xssfWorkbook = new XSSFWorkbook(resourceAsStream);
		int rowCount = 1;
		return setTableData(releaseDetails, xssfWorkbook, rowCount);
	}

	/**
	 * This method is responsible for setting the data of an Excel document, using a
	 * template and a list of ReleaseDetails objects.
	 * The data is written to the template starting at the specified row number.
	 * 
	 * @param ReleaseDetails a List of ReleaseDetails objects, representing the data
	 *                       that will be written to the Excel document
	 * @param templatePath   an XSSFWorkbook object, representing the template Excel
	 *                       document that the data will be written to
	 * @param rowCount       an int, representing the starting row number where data
	 *                       will be written in the Excel document
	 * @return a byte array of the Excel document after the data has been written to
	 *         it.
	 * @throws IOException if there is an issue reading or writing to the Excel
	 *                     document
	 */

	/**
	 * This method appears to take in three parameters:
	 * A List of ReleaseDetails objects, representing the data that will be written
	 * to the Excel document.
	 * An XSSFWorkbook object, representing the template Excel document that the
	 * data will be written to.
	 * An int, representing the starting row number where data will be written in
	 * the Excel document.
	 * The method has a return type of byte array, which is the Excel document after
	 * the data has been written to it. The method also throws an IOException, which
	 * would be thrown if there is an issue reading or writing to the Excel
	 * document.
	 * The method starts by creating some maps to hold data that will be used later:
	 * tableColumn: a map that will hold the columns of the Excel table.
	 * identityColumnMapping: a map that will hold the mapping of columns
	 * templateHeaders: a map that will hold the headers of the excel template
	 * then it calls
	 * ExcelUtils.parseMappeddJson(tableColumn,identityColumnMapping,templateHeaders);
	 * to get the values for the maps created.
	 * Then it creates an instance of ExcelWriter which will write the data to the
	 * workbook, it set the active sheet to the first sheet of the workbook and
	 * check if ReleaseDetails list is not empty.
	 * It then iterates over the list of ReleaseDetails objects and for each
	 * ReleaseDetails, it creates a new row in the Excel document at the specified
	 * row number.
	 * It also retrieves the list of columns for the "ReleaseDetails" entity from
	 * the tableColumn map, and iterates over the columns.
	 * For each column, it attempts to retrieve the value for that column from the
	 * current ReleaseDetails object using the ExcelUtils.invokeGetter method,
	 * passing in the current ReleaseDetails object, the column name and the
	 * identityColumnMapping.
	 * The value returned by this method is then set as the value of the cell in the
	 * current row and column.
	 * If an introspection exception occur it will print the stacktrace of the
	 * exception
	 * After all the data is written to the Excel document, the method returns the
	 * Excel document as a byte array using excelWriter.toByteArray() and log "going
	 * to return file"
	 */	

	private byte[] setTableData(List<ReleaseDetails> releaseDetails, XSSFWorkbook templatePath, int rowCount)
			throws IOException {
		Map<String, List<String>> tableColumn = new HashMap<>();
		String entity = ENTITY_NAME;
		Map<String, String> identityColumnMapping = new HashMap<>();
		Map<String, List<String>> templateHeaders = new HashMap<>();
		ExcelUtils.parseMappeddJson(tableColumn, identityColumnMapping, templateHeaders);
		log.info("table column map is :{}", tableColumn);
		try (ExcelWriter excelWriter = new ExcelWriter(templatePath)) {
			excelWriter.getWorkbook().setActiveSheet(0);
			if (CollectionUtils.isNotEmpty(releaseDetails)) {
				for (ReleaseDetails releaseDetailsDetails : releaseDetails) {
					ExcelRow row = excelWriter.getOrCreateRow(0, rowCount);
					int index = 0;
					List<String> columns = tableColumn.get(entity);
					for (String column : columns) {
						if (column != null) {
							try {
								row.setCellValue(index, ExcelUtils
										.invokeGetter(releaseDetailsDetails, column, identityColumnMapping).toString());
							} catch (IntrospectionException e) {
								log.error("IntrospectionException occurred: {}", e.getMessage());
							}
						}
						++index;
					}
					rowCount++;
				}
			}
			log.info("going to return file");
			return excelWriter.toByteArray();
		}
	}

	/**
	 * This method is responsible for importing data from an Excel file,
	 * specifically data related to ReleaseDetails objects.
	 * The method takes in a MultipartFile object, which represents the Excel file
	 * containing the data.
	 * The method then validates the template headers in the Excel file and if they
	 * are valid, it saves the data to the database.
	 *
	 * @param excelFile a MultipartFile object representing the Excel file
	 *                  containing the data
	 * @return a string indicating whether the data import was successful or not.
	 * @throws IOException            if there is an issue reading from the Excel
	 *                                file
	 * @throws InstantiationException when there is issue with instantiation
	 * @throws ClassNotFoundException when the class not found
	 */

	@Override
	public String importData(MultipartFile excelFile)
			throws IOException, InstantiationException, ClassNotFoundException {
		List<ReleaseDetails> releaseDetailss = new ArrayList<>();
		Excel workBook = new Excel(excelFile.getInputStream());
		Map<String, List<String>> tableColumn = new HashMap<>(); // Table Name and list of Columns
		Map<String, String> columnsMapping = new HashMap<>(); // Json Mapping DispalyName and Name
		Map<String, List<String>> templateHeadres = new HashMap<>();
		List<String> displayNames = new ArrayList<>();
		ExcelUtils.parseMappeddJson(tableColumn, columnsMapping, templateHeadres);
		displayNames.addAll(templateHeadres.get(ENTITY_NAME));
		List<String> columnNames = new ArrayList<>();
		columnNames.addAll(tableColumn.get(ENTITY_NAME));
		boolean validateTableTemplateHeader = ExcelUtils.validateTableTemplateHeader(workBook, displayNames);// Validating
																												// Columns
																											// and
																												// Headers
		if (validateTableTemplateHeader) {
			log.info("columns and headers are validated");
			releaseDetailss = saveData(workBook, columnsMapping, columnNames);
		} else {
			log.info("columns and headers invalide");
		}
		if (CollectionUtils.isNotEmpty(releaseDetailss)) {
			releaseDetailsRepository.saveAll(releaseDetailss);
			return APIConstants.SUCCESS_JSON;
		}
		return APIConstants.FAILURE_JSON;
	}

	/**
	 * This method is responsible for saving data to the database, specifically data
	 * related to ReleaseDetails objects.
	 * The method takes in an Excel object, which represents the sheet containing
	 * the data, a mapping of columns from the excel sheet to the ReleaseDetails
	 * class, and a list of column names.
	 * The method uses the iterator for the sheet to read data row by row, create
	 * new ReleaseDetails objects, and set the properties of the ReleaseDetails
	 * objects using the column mapping and column names.
	 * The method returns a list of ReleaseDetails objects that have been saved to
	 * the database.
	 * 
	 * @param sheet         an Excel object representing the sheet containing the
	 *                      data
	 * @param columnMapping a map representing the mapping of columns from the excel
	 *                      sheet to the ReleaseDetails class
	 * @param columnNames   a list of column names of the excel sheet
	 * @return a list of ReleaseDetails objects that have been saved to the database
	 */

	public List<ReleaseDetails> saveData(Excel sheet, Map<String, String> columnMapping, List<String> columnNames) {
		Iterator<ExcelRow> rowIterator = sheet.iterator();
		List<ReleaseDetails> releaseDetailss = new ArrayList<>();
		rowIterator.next();
		while (rowIterator.hasNext()) {
			ExcelRow excelRow = rowIterator.next();
			ReleaseDetails releaseDetails = new ReleaseDetails();
			int index = -1;
			for (String columnName : columnNames) {
				try {
					ExcelUtils.invokeSetter(releaseDetails, columnName, excelRow.getString(++index));
				} catch (InstantiationException e) {
					log.error("failed while going to set the value :{}", excelRow.getString(++index));
					log.error("InstantiationException occurred: {}", e.getMessage());
				} catch (ClassNotFoundException e) {
					log.error("ClassNotFoundException occurred: {}", e.getMessage());
				}
			}
			releaseDetailss.add(releaseDetails);
		}
		return releaseDetailss;
	}

	/**
	 * This method is responsible for soft-deleting an ReleaseDetails record in the
	 * database.
	 * The method takes in an int id which represents the id of the ReleaseDetails
	 * that needs to be soft-deleted.
	 * It uses the id to find the ReleaseDetails by calling the
	 * ReleaseDetailsRepository.findById method.
	 * If the ReleaseDetails is found, it sets the "deleted" field to true, save the
	 * ReleaseDetails in the repository, and saves it in the database
	 * 
	 * @param id an int representing the id of the ReleaseDetails that needs to be
	 *           soft-deleted
	 */

	@Override
	public void softDelete(int id) {
		Optional<ReleaseDetails> releaseDetails = releaseDetailsRepository.findById(id);
		if (releaseDetails.isPresent()) {
			ReleaseDetails releaseDetails1 = releaseDetails.get();
			releaseDetails1.setDeleted(true);
			releaseDetailsRepository.save(releaseDetails1);
		}
	}

	/**
	 * This method is responsible for soft-deleting multiple ReleaseDetails records
	 * in the database in bulk.
	 * The method takes in a List of integers, each representing the id of an
	 * ReleaseDetails that needs to be soft-deleted.
	 * It iterates through the list, calling the softDelete method for each id
	 * passed in the list.
	 * 
	 * @param list a List of integers representing the ids of the ReleaseDetails
	 *             that need to be soft-deleted
	 */

	@Override
	public void softBulkDelete(List<Integer> list) {
		if (list != null) {
			for (int i = 0; i < list.size(); i++) {
				softDelete(list.get(i));
			}
		}
	}

	/**
	 * @param releaseDetails The releaseDetails object to create.
	 * @return The created vendor object.
	 */
	@Override
	public ReleaseDetails create(ReleaseDetails releaseDetails) {   
		String hostPath = "https://dev.visionwaves.com/miniapp/" + releaseDetails.getMiniAppDetails().getName() + "/";
		releaseDetails.setHostPath(hostPath);
		return releaseDetailsRepository.save(releaseDetails);
	}

	/**
	 * @param roleId
	 * @return List of entities that match the given query.
	 */
	// @Override
	// public List<ReleaseDetails> findReleasedByRole(int roleId) {
	// System.out.print("columns and headers are validated 1111" + roleId);
	// log.info("columns and headers are validated");

	// // Retrieve all ReleaseDetails from the repository
	// // Filter ReleaseDetails based on the roleId
	// List<ReleaseDetails> filteredReleaseDetails = new
	// ArrayList<ReleaseDetails>();

	// try {
	// List<ReleaseDetails> releaseDetails = releaseDetailsRepository.findAll();

	// System.out.print("columns and headers are validated 222" +
	// releaseDetails.toString());
	// filteredReleaseDetails = releaseDetails.stream()
	// .filter(releaseDetail -> {
	// MiniappDetails miniappDetails = releaseDetail.getMiniAppDetails();
	// System.out.println("this is the miniappDetails " + miniappDetails.getId());
	// Set<com.enttribe.superapp.model.OrganisationRole> organisationRoles =
	// miniappDetails.getOrganisationRoles();
	// System.out.println("miniappDetails roles "+ organisationRoles.size());
	// // Check if any OrganisationRole matches the roleId
	// return organisationRoles.stream()
	// .anyMatch(organisationRole -> organisationRole.getOrganisationRoleId() ==
	// roleId);
	// })

	// .collect(Collectors.toList());
	// System.out.print("columns and headers are validated 3333" +
	// filteredReleaseDetails.toString());

	// } catch (Exception e) {
	// System.out.println("error you encountering " + e);
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }

	// return filteredReleaseDetails;
	// }

	// @Override
	// public List<ReleaseDetails> findReleasedByRole(int roleId) {
	// List<ReleaseDetails> releaseDetails = releaseDetailsRepository.findAll();
	// List<ReleaseDetails> releaseDetails2 = new ArrayList<ReleaseDetails>();
	// for (ReleaseDetails releaseDetail : releaseDetails) {
	// MiniappDetails miniappDetails = releaseDetail.getMiniAppDetails();
	// Set<com.enttribe.superapp.model.OrganisationRole> organisationRoles =
	// miniappDetails.getOrganisationRoles();
	// System.out.println("miniappDetailsroles " + organisationRoles.size() + "
	// miniappDetails id" + miniappDetails.getId());

	// for (com.enttribe.superapp.model.OrganisationRole organisationRole :
	// organisationRoles) {
	// System.out.println("organisationRole id " +
	// organisationRole.getOrganisationRoleId() + " roleId id" + roleId);
	// if(organisationRole.getOrganisationRoleId() == roleId) {
	// releaseDetails2.add(releaseDetail);
	// }
	// } // Example of what you might do with each ReleaseDetails object
	// }

	// return releaseDetails2;
	// }

	// @Override
	// public List<ReleaseDetails> findReleasedByRole(int roleId) {
	// return releaseDetailsRepository.findAll().stream()
	// .filter(releaseDetail ->
	// "released".equalsIgnoreCase(releaseDetail.getStatus()))
	// .filter(releaseDetail ->
	// releaseDetail.getMiniAppDetails().getOrganisationRoles().stream()
	// .anyMatch(role -> role.getOrganisationRoleId() == roleId))
	// .collect(Collectors.toList());
	// }

	// @Override
	// public List<ReleaseDetails> findReleasedByRole(int roleId) {

	// return releaseDetailsRepository.findAll().stream()
	// .filter(releaseDetail ->
	// "released".equalsIgnoreCase(releaseDetail.getStatus()))
	// .filter(releaseDetail ->
	// releaseDetail.getMiniAppDetails().getOrganisationRoles().stream()
	// .anyMatch(role -> role.getOrganisationRoleId() == roleId))
	// .collect(Collectors.toList());
	// }

	// @Override
	// public List<ReleaseDetails> findReleasedByRole(int roleId) {

	// 	try {
	// 		List<ReleaseDetails> list = releaseDetailsRepository.findAll().stream()
	// 				.filter(releaseDetail -> "released".equalsIgnoreCase(releaseDetail.getStatus()))
	// 				.filter(releaseDetail -> releaseDetail.getMiniAppDetails().getOrganisationRoles().stream()
	// 						.anyMatch(role -> role.getOrganisationRoleId() == roleId))
	// 				.collect(Collectors.toList());
	// 	} catch (Exception e) {
	// 		System.out.println("the error you encountering 1 " + e.toString());
	// 		// TODO Auto-generated catch block
	// 		e.printStackTrace();
	// 	}    
	
	// 	return releaseDetailsRepository.findAll().stream()
	// 			.filter(releaseDetail -> ("released".equalsIgnoreCase(releaseDetail.getStatus()) && "released".equalsIgnoreCase(releaseDetail.getMiniAppDetails().getWorkflowStage())))
	// 			.filter(releaseDetail -> releaseDetail.getMiniAppDetails().getOrganisationRoles().stream()
	// 					.anyMatch(role -> role.getOrganisationRoleId() == roleId))
	// 			.collect(Collectors.toList());

	// } 


	@Override
public List<ReleaseDetails> findReleasedByRole(int roleId) {
    List<ReleaseDetails> list = new ArrayList<>();
    try {
        list = releaseDetailsRepository.findAll().stream()
                .filter(releaseDetail -> "released".equalsIgnoreCase(releaseDetail.getStatus()) && 
                        "released".equalsIgnoreCase(releaseDetail.getMiniAppDetails().getWorkflowStage()))
                .filter(releaseDetail -> releaseDetail.getMiniAppDetails().getOrganisationRoles().stream()
                        .anyMatch(role -> role.getOrganisationRoleId() == roleId))
                .collect(Collectors.toList());
    } catch (Exception e) {
        System.out.println("the error you are encountering: " + e.toString());
        e.printStackTrace();
    } 
    return list;
}



	@Override
public ReleaseDetails triggerPipeLine(int id) throws IOException, InterruptedException, KeyManagementException, NoSuchAlgorithmException, KeyStoreException {  
    String JENKINS_TOKEN = ConfigUtil.getConfigProp(APIConstants.JENKINS_TOKEN); 
    String JENKINS_USER = ConfigUtil.getConfigProp(APIConstants.JENKINS_USER); 
    String JENKINS_URL = ConfigUtil.getConfigProp(APIConstants.JENKINS_URL); 
    String DOCKER_REGISTRY = ConfigUtil.getConfigProp(APIConstants.DOCKER_REGISTRY); 
    String K8S_NAME_SPACE = ConfigUtil.getConfigProp(APIConstants.K8S_NAME_SPACE); 
    String JENKINS_CRUMB = ConfigUtil.getConfigProp(APIConstants.JENKINS_CRUMB); 
    // String JENKINS_COOKIE = ConfigUtil.getConfigProp(APIConstants.JENKINS_COOKIE); // Get the cookie from config
    String JENKINS_AUTH = "Basic " + Base64.getEncoder().encodeToString((JENKINS_USER + ":" + JENKINS_TOKEN).getBytes());
	String auth = JENKINS_USER + ":" + JENKINS_TOKEN;
	byte[] encodedAuth = org.apache.commons.codec.binary.Base64.encodeBase64(auth.getBytes());
	String authHeader = "Basic " + new String(encodedAuth);

    log.info("JENKINS_TOKEN : " + JENKINS_TOKEN); 
    log.info("JENKINS_USER : " + JENKINS_USER);
    log.info("JENKINS_URL : " + JENKINS_URL);
    log.info("DOCKER_REGISTRY : " + DOCKER_REGISTRY);
    log.info("K8S_NAME_SPACE : " + K8S_NAME_SPACE);
    log.info("JENKINS_CRUMB : " + JENKINS_CRUMB); 
	log.info("JENKINS_AUTH :" + JENKINS_AUTH);
    // log.info("JENKINS_COOKIE : " + JENKINS_COOKIE); // Log the cookie value

    ReleaseDetails releaseDetails = releaseDetailsRepository.findById(id).get();
    String BUILD_NUMBER = ""+releaseDetails.getBuildInfo().getBuildNumber(); 
	String MINI_APP_DETAILS_ID = ""+releaseDetails.getMiniAppDetails().getId();  
	String APP_NAME = releaseDetails.getMiniAppDetails().getName();  
    SSLContext sslContext = SSLContexts.custom()
            .loadTrustMaterial((chain, authType) -> true)
            .build();

    BasicCredentialsProvider credsProvider = new BasicCredentialsProvider();
    credsProvider.setCredentials(
            AuthScope.ANY,
            new UsernamePasswordCredentials(JENKINS_USER, JENKINS_TOKEN));

    CloseableHttpClient httpClient = HttpClients.custom()
            .setSSLContext(sslContext)
            .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
            .setDefaultCredentialsProvider(credsProvider)
            .build();

    try {
        HttpPost postRequest = new HttpPost(JENKINS_URL + "/jenkins/job/SuperApp/buildWithParameters");
      
        // Set headers              
        postRequest.setHeader("Jenkins-Crumb", JENKINS_CRUMB);
        postRequest.setHeader("Content-Type", "application/x-www-form-urlencoded");
        // postRequest.setHeader("Authorization", JENKINS_AUTH);  
		postRequest.setHeader("Authorization", authHeader);
		postRequest.setHeader("Cookie", "JSESSIONID.1dae7fc7=node0xwrxc09mqe4dk2k5d6nkr6wo193036.node0"); 
        // postRequest.setHeader("Cookie", JENKINS_COOKIE);
        log.info("JENKINS_CRUMB this is the result: " + JENKINS_CRUMB); 
        
        // Set form datas
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("APPLICATION_NAME", APP_NAME));
        params.add(new BasicNameValuePair("DOCKER_REGISTRY", DOCKER_REGISTRY));
        params.add(new BasicNameValuePair("IMAGE_TAG", releaseDetails.getVersion()));
        params.add(new BasicNameValuePair("K8S_NAME_SPACE", K8S_NAME_SPACE)); 
		params.add(new BasicNameValuePair("ID", "" + id));
		params.add(new BasicNameValuePair("MINI_APP_DETAILS_ID", MINI_APP_DETAILS_ID)); 
		params.add(new BasicNameValuePair("BUILD_NUMBER", BUILD_NUMBER));
        postRequest.setEntity(new UrlEncodedFormEntity(params));
        
        log.info("Complete params: " + params.toString());

        try (CloseableHttpResponse response = httpClient.execute(postRequest)) {
            log.info("Response of this trigger: " + response.toString() + response.getStatusLine().getStatusCode());
            
            if (response.getStatusLine().getStatusCode() != 201) {
                String responseBody = EntityUtils.toString(response.getEntity());  

                log.error("Error response body: " + responseBody);
                throw new IOException("Failed to trigger Jenkins pipeline. Response: " + responseBody);
            }

            String queueItemUrl = response.getFirstHeader("Location").getValue();
            log.info("Queue item URL: " + queueItemUrl);
            if (queueItemUrl == null || queueItemUrl.isEmpty()) {
                throw new IOException("Failed to retrieve Jenkins queue item URL");
            }

            int buildId = pollQueueForBuildId(httpClient, queueItemUrl,authHeader,JENKINS_CRUMB); 
			releaseDetails.setPipelineBuildId(buildId); 
			
            log.info("Build ID: " + buildId); 

            ResponseEntity.ok(new TriggerResponse(buildId)).toString();  
			return update(releaseDetails);
        }
    } finally {
        if (httpClient != null) {
            httpClient.close();
        }
    }
} 

@Autowired
	private DocumentIntegrationService documentIntegrationService; 

private int pollQueueForBuildId(CloseableHttpClient httpClient, String queueItemUrl,String authHeader,String JENKINS_CRUMB)
        throws IOException, InterruptedException {
    while (true) {
		log.info("pollQueueForBuildId 1111"  + queueItemUrl );
        HttpGet getRequest = new HttpGet(queueItemUrl + "api/json");   
		getRequest.setHeader("Jenkins-Crumb", JENKINS_CRUMB);
        getRequest.setHeader("Content-Type", "application/x-www-form-urlencoded");
        // postRequest.setHeader("Authorization", JENKINS_AUTH);  
		getRequest.setHeader("Authorization", authHeader);
		getRequest.setHeader("Cookie", "JSESSIONID.1dae7fc7=node0xwrxc09mqe4dk2k5d6nkr6wo193036.node0"); 
		log.info("pollQueueForBuildId 2222" + getRequest);
        try (CloseableHttpResponse queueResponse = httpClient.execute(getRequest)) {
			log.info("pollQueueForBuildId 3333" + queueResponse.toString()); 
            String queueResponseString = EntityUtils.toString(queueResponse.getEntity()); 
			log.info("pollQueueForBuildId 4444" +  queueResponseString);
			
            try {
				QueueResponse queueData = new ObjectMapper().readValue(queueResponseString, QueueResponse.class); 
				log.info("pollQueueForBuildId 5555" +  queueData);
				if (queueData.getExecutable() != null) {
				    return queueData.getExecutable().getNumber();
				}
			} catch (JsonMappingException e) {
				log.info("JsonMappingException 1" + e);
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JsonProcessingException e) { 
				log.info("JsonMappingException 2" + e);
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
			catch (Exception e) { 
				log.info("JsonMappingException 3" + e);
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        Thread.sleep(2000); // Poll every 2 seconds
    }
 }

    @Override
	public ReleaseDetails update(ReleaseDetails entity) {
		 MiniappDetails miniappDetails  = entity.getMiniAppDetails();
		 log.info("update 1111" + entity.getStatus());
		   if(!entity.getStatus().equalsIgnoreCase("PENDING") && entity.getStatus().equalsIgnoreCase("FAILED")){
			MessageIntegrationWrapper messageIntegrationWrapper = new MessageIntegrationWrapper()/*ApplicationContextProvider.getApplicationContext().getBean(MessageIntegrationWrapper.class)*/; 
			 messageIntegrationWrapper.setApplication(APIConstants.APPNAME);
             messageIntegrationWrapper.setEventType(Event.MESSAGE);
             messageIntegrationWrapper.setMessage("releasemessage");
             messageIntegrationWrapper.setProcessInstanceId(miniappDetails.getProcessInstanceId());
			 Map<String, Object> variable = new  HashMap<>();
			 variable.put("status", "Failure");
             messageIntegrationWrapper.setVariables(variable);	
			documentIntegrationService.submitMessageEventRequest(messageIntegrationWrapper,miniappDetails.getProcessInstanceId());
		   } else if(!entity.getStatus().equalsIgnoreCase("PENDING") && entity.getStatus().equalsIgnoreCase("RELEASED")){
			MessageIntegrationWrapper messageIntegrationWrapper = new MessageIntegrationWrapper()/*ApplicationContextProvider.getApplicationContext().getBean(MessageIntegrationWrapper.class) */; 
			messageIntegrationWrapper.setApplication(APIConstants.APPNAME);
			messageIntegrationWrapper.setEventType(Event.MESSAGE);
			messageIntegrationWrapper.setMessage("releasemessage");
			messageIntegrationWrapper.setProcessInstanceId(miniappDetails.getProcessInstanceId());
			Map<String, Object> variable = new  HashMap<>();
			variable.put("status", "Success");
			messageIntegrationWrapper.setVariables(variable);
		    documentIntegrationService.submitMessageEventRequest(messageIntegrationWrapper,miniappDetails.getProcessInstanceId());  
		   } 
		return super.update(entity);
	}
} 







class TriggerResponse {
	private final int id;
	
	public TriggerResponse(int id) {
		this.id = id;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TriggerResponse other = (TriggerResponse) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "TriggerResponse [id=" + id + "]";
	}

	public int getId() {
		return id;
	}
	} 
	

@JsonIgnoreProperties(ignoreUnknown = true)
 class QueueResponse {
    private Executable executable;
    
    public Executable getExecutable() {
        return executable;
    }
    
    public void setExecutable(Executable executable) {
        this.executable = executable;
    }
    
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Executable {
        private int number;
    
        public int getNumber() {
            return number;
        }
    
        public void setNumber(int number) {
            this.number = number;
        }
    }
}
