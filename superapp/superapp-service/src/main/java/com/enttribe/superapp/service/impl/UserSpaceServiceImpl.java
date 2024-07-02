package com.enttribe.superapp.service.impl;

import org.springframework.stereotype.Service;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import com.enttribe.commons.io.excel.Excel;
import com.enttribe.commons.io.excel.ExcelRow;
import com.enttribe.commons.io.excel.ExcelWriter;
import com.enttribe.commons.lang.StringUtils;
import java.beans.IntrospectionException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import java.util.Optional;
import com.enttribe.superapp.repository.UserSpaceRepository;
import com.enttribe.superapp.integration.service.DocumentIntegrationService;
import com.enttribe.superapp.model.UserSpace;
import com.enttribe.superapp.repository.generic.GenericRepository;
import com.enttribe.superapp.service.UserSpaceService;
import com.enttribe.superapp.service.generic.AbstractService;
import com.enttribe.superapp.util.APIConstants;
import com.enttribe.superapp.util.report.ExcelUtils;
import com.enttribe.product.security.spring.userdetails.CustomerInfo;
import com.enttribe.core.generic.utils.ApplicationContextProvider;

/**
*
This is a class named "UserSpaceServiceImpl" which is located in the package " com.enttribe.superapp.service.impl", It appears to be an implementation of the "UserSpaceService" interface and it extends the "AbstractService" class, which seems to be a generic class for handling CRUD operations for entities. This class is annotated with @Service, indicating that it is a Spring Service bean.
This class is using Lombok's @Slf4j annotation which will automatically generate an Slf4j based logger instance, so it is using the Slf4j API for logging.
The class has a constructor which takes a single parameter of GenericRepository UserSpace and is used to call the superclass's constructor.
This class have one public method public byte[] export(List of UserSpace  UserSpace) for exporting the UserSpace data into excel file by reading the template and mapping the UserSpace details into it.
It's using Apache POI library for reading and writing excel files, and has methods for parsing the json files for column names and identities , and it also used 'ExcelUtils' for handling the excel operations.
It also uses 'ApplicationContextProvider' from 'com.enttribe.core.generic.utils' and 'APIConstants' from 'com.enttribe.superapp.util'
*
* */

@Service
@Slf4j
public class UserSpaceServiceImpl extends AbstractService<UserSpace> implements UserSpaceService {

/**
* Constructor for UserSpaceServiceImpl.
* @param repository The GenericRepository used to perform CRUD operations for UserSpace entities.
*/
	public UserSpaceServiceImpl(GenericRepository<UserSpace> repository) {
		super(repository,UserSpace.class);
	}
	
	private static final String ENTITY_NAME = "UserSpace"; 
	
	@Autowired
	private UserSpaceRepository userSpaceRepository; 


   @Autowired
   private DocumentIntegrationService documentIntegrationService;
	
/**
* This method is used to export the given list of UserSpace objects into an excel file.
* It reads an excel template 'UserSpace.xlsx' from the resource folder 'templates/reports'
* and maps the UserSpace data onto the template and returns the generated excel file in the form of a byte array.
* param UserSpace - List of UserSpace objects to be exported
* @return byte[] - The generated excel file in the form of a byte array
* @throws IOException - When the template file is not found or there is an error reading the file
*/
	@Override
	public byte[] export(List<UserSpace> userSpace) throws IOException {
		InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream("templates/reports/UserSpace.xlsx");
	    XSSFWorkbook xssfWorkbook = new XSSFWorkbook(resourceAsStream); 
		int rowCount = 1;
		return setTableData(userSpace,xssfWorkbook, rowCount);
	}

/**
 * This method is responsible for setting the data of an Excel document, using a template and a list of UserSpace objects.
 * The data is written to the template starting at the specified row number.
 * 
 * @param UserSpace a List of UserSpace objects, representing the data that will be written to the Excel document
 * @param templatePath an XSSFWorkbook object, representing the template Excel document that the data will be written to
 * @param rowCount an int, representing the starting row number where data will be written in the Excel document
 * @return a byte array of the Excel document after the data has been written to it.
 * @throws IOException if there is an issue reading or writing to the Excel document
 */
/**This method appears to take in three parameters:
A List of UserSpace objects, representing the data that will be written to the Excel document.
An XSSFWorkbook object, representing the template Excel document that the data will be written to.
An int, representing the starting row number where data will be written in the Excel document.
The method has a return type of byte array, which is the Excel document after the data has been written to it. The method also throws an IOException, which would be thrown if there is an issue reading or writing to the Excel document.
The method starts by creating some maps to hold data that will be used later:
tableColumn: a map that will hold the columns of the Excel table.
identityColumnMapping: a map that will hold the mapping of columns
templateHeaders: a map that will hold the headers of the excel template
then it calls ExcelUtils.parseMappeddJson(tableColumn,identityColumnMapping,templateHeaders); to get the values for the maps created.
Then it creates an instance of ExcelWriter which will write the data to the workbook, it set the active sheet to the first sheet of the workbook and check if UserSpace list is not empty.
It then iterates over the list of UserSpace objects and for each UserSpace, it creates a new row in the Excel document at the specified row number.
It also retrieves the list of columns for the "UserSpace" entity from the tableColumn map, and iterates over the columns.
For each column, it attempts to retrieve the value for that column from the current UserSpace object using the ExcelUtils.invokeGetter method, passing in the current UserSpace object, the column name and the identityColumnMapping.
The value returned by this method is then set as the value of the cell in the current row and column.
If an introspection exception occur it will print the stacktrace of the exception
After all the data is written to the Excel document, the method returns the Excel document as a byte array using excelWriter.toByteArray() and log "going to return file"
* */

	private byte[] setTableData(List<UserSpace>userSpace, XSSFWorkbook templatePath, int rowCount)throws IOException {
		Map<String,List<String>> tableColumn=new HashMap<>();
		String entity=ENTITY_NAME;
        Map<String, String> identityColumnMapping =new HashMap<>();
        Map<String,List<String>> templateHeaders = new HashMap<>();
		ExcelUtils.parseMappeddJson(tableColumn,identityColumnMapping,templateHeaders);
		log.info("table column map is :{}",tableColumn);
		try (ExcelWriter excelWriter = new ExcelWriter(templatePath)) {
			excelWriter.getWorkbook().setActiveSheet(0);
			if (CollectionUtils.isNotEmpty(userSpace)) {
			for (UserSpace userSpaceDetails : userSpace) {
				ExcelRow row = excelWriter.getOrCreateRow(0, rowCount);
				int index = 0;
				List<String> columns = tableColumn.get(entity);
 			for(String column:columns) {
				if(column!=null) {   
				try {
					row.setCellValue(index, ExcelUtils.invokeGetter(userSpaceDetails,column,identityColumnMapping).toString());
				}catch (IntrospectionException e) {
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
 * This method is responsible for importing data from an Excel file, specifically data related to UserSpace objects.
 * The method takes in a MultipartFile object, which represents the Excel file containing the data.
 * The method then validates the template headers in the Excel file and if they are valid, it saves the data to the database.
 *
 * @param excelFile a MultipartFile object representing the Excel file containing the data
 * @return a string indicating whether the data import was successful or not.
 * @throws IOException if there is an issue reading from the Excel file
 * @throws InstantiationException when there is issue with instantiation
 * @throws ClassNotFoundException when the class not found
 */

	@Override
	public String importData(MultipartFile excelFile) throws IOException , InstantiationException, ClassNotFoundException {
		List<UserSpace> userSpaces =new ArrayList<>();
    	Excel workBook = new Excel(excelFile.getInputStream());
      	Map<String, List<String>> tableColumn = new HashMap<>(); // Table Name and list of Columns
      	Map<String, String> columnsMapping = new HashMap<>(); // Json Mapping DispalyName and Name
       	Map<String, List<String>> templateHeadres = new HashMap<>();
        List<String> displayNames = new ArrayList<>();
      	ExcelUtils.parseMappeddJson(tableColumn, columnsMapping,templateHeadres);
        displayNames.addAll(templateHeadres.get(ENTITY_NAME));
      	List<String> columnNames = new ArrayList<>();
        columnNames.addAll(tableColumn.get(ENTITY_NAME));
      	boolean validateTableTemplateHeader =
        ExcelUtils.validateTableTemplateHeader(workBook, displayNames);// Validating Columns and Headers
        if (validateTableTemplateHeader) {
        	log.info("columns and headers are validated");
        	userSpaces = saveData(workBook, columnsMapping, columnNames);
      	}
    	else {
      		log.info("columns and headers invalide");
      	}
	if (CollectionUtils.isNotEmpty(userSpaces)) {
		userSpaceRepository.saveAll(userSpaces);
		return APIConstants.SUCCESS_JSON;
	}
		return APIConstants.FAILURE_JSON;
	}

/**
 * This method is responsible for saving data to the database, specifically data related to UserSpace objects.
 * The method takes in an Excel object, which represents the sheet containing the data, a mapping of columns from the excel sheet to the UserSpace class, and a list of column names.
 * The method uses the iterator for the sheet to read data row by row, create new UserSpace objects, and set the properties of the UserSpace objects using the column mapping and column names.
 * The method returns a list of UserSpace objects that have been saved to the database.
 * @param sheet an Excel object representing the sheet containing the data
 * @param columnMapping a map representing the mapping of columns from the excel sheet to the UserSpace class
 * @param columnNames a list of column names of the excel sheet
 * @return a list of UserSpace objects that have been saved to the database
 */

	public List<UserSpace> saveData(Excel sheet, Map<String, String> columnMapping, List<String> columnNames) {
		Iterator<ExcelRow> rowIterator = sheet.iterator();
		List<UserSpace> userSpaces = new ArrayList<>();
		rowIterator.next();
		while (rowIterator.hasNext()) {
			ExcelRow excelRow = rowIterator.next();
          	UserSpace userSpace = new UserSpace();
            int index = -1;
      	for (String columnName : columnNames) {
        	try {
          		ExcelUtils.invokeSetter(userSpace, columnName, excelRow.getString(++index));
                } catch (InstantiationException e) {
          	log.error("failed while going to set the value :{}", excelRow.getString(++index));
          	log.error("InstantiationException occurred: {}", e.getMessage());
        } catch (ClassNotFoundException e) {
        log.error("ClassNotFoundException occurred: {}", e.getMessage());
		}
	}
	userSpaces.add(userSpace);
 	}
		return userSpaces;
	} 
/**
* This method is responsible for soft-deleting an UserSpace  record in the database.
* The method takes in an int id which represents the id of the UserSpace  that needs to be soft-deleted.
* It uses the id to find the UserSpace by calling the UserSpaceRepository.findById method.
* If the UserSpace  is found, it sets the "deleted" field to true, save the UserSpace  in the repository, and saves it in the database
* @param id an int representing the id of the UserSpace  that needs to be soft-deleted
*/
	
	@Override
	public void softDelete(int id) {
		Optional<UserSpace> userSpace = userSpaceRepository.findById(id);
		if (userSpace.isPresent()) {
			UserSpace userSpace1 = userSpace.get();
			// userSpace1.setDeleted(true);
		    userSpaceRepository.save(userSpace1);
		}
	}
	
/**
* This method is responsible for soft-deleting multiple UserSpace records in the database in bulk.
* The method takes in a List of integers, each representing the id of an UserSpace that needs to be soft-deleted.
* It iterates through the list, calling the softDelete method for each id passed in the list.
* @param list a List of integers representing the ids of the UserSpace that need to be soft-deleted
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
 * @param userSpace The userSpace  object to create.
 * @return The created vendor object.
 */
	@Override
	public UserSpace create(UserSpace userSpace) {  
		return  userSpaceRepository.save(userSpace);
	}

}
