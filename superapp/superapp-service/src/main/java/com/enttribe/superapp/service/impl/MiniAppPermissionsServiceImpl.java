package com.enttribe.superapp.service.impl;

import org.springframework.stereotype.Service;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import com.enttribe.commons.io.excel.Excel;
import com.enttribe.commons.io.excel.ExcelRow;
import com.enttribe.commons.io.excel.ExcelWriter;
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
import com.enttribe.superapp.repository.MiniAppPermissionsRepository;
import com.enttribe.superapp.integration.service.DocumentIntegrationService;
import com.enttribe.superapp.model.MiniAppPermissions;
import com.enttribe.superapp.repository.generic.GenericRepository;
import com.enttribe.superapp.service.MiniAppPermissionsService;
import com.enttribe.superapp.service.generic.AbstractService;
import com.enttribe.superapp.util.APIConstants;
import com.enttribe.superapp.util.report.ExcelUtils;

/**
*
This is a class named "MiniAppPermissionsServiceImpl" which is located in the package " com.enttribe.superapp.service.impl", It appears to be an implementation of the "MiniAppPermissionsService" interface and it extends the "AbstractService" class, which seems to be a generic class for handling CRUD operations for entities. This class is annotated with @Service, indicating that it is a Spring Service bean.
This class is using Lombok's @Slf4j annotation which will automatically generate an Slf4j based logger instance, so it is using the Slf4j API for logging.
The class has a constructor which takes a single parameter of GenericRepository MiniAppPermissions and is used to call the superclass's constructor.
This class have one public method public byte[] export(List of MiniAppPermissions  MiniAppPermissions) for exporting the MiniAppPermissions data into excel file by reading the template and mapping the MiniAppPermissions details into it.
It's using Apache POI library for reading and writing excel files, and has methods for parsing the json files for column names and identities , and it also used 'ExcelUtils' for handling the excel operations.
It also uses 'ApplicationContextProvider' from 'com.enttribe.core.generic.utils' and 'APIConstants' from 'com.enttribe.superapp.util'
*
* */

@Service
@Slf4j
public class MiniAppPermissionsServiceImpl extends AbstractService<MiniAppPermissions> implements MiniAppPermissionsService {

/**
* Constructor for MiniAppPermissionsServiceImpl.
* @param repository The GenericRepository used to perform CRUD operations for MiniAppPermissions entities.
*/
	public MiniAppPermissionsServiceImpl(GenericRepository<MiniAppPermissions> repository) {
		super(repository,MiniAppPermissions.class);
	}
	
	private static final String ENTITY_NAME = "MiniAppPermissions"; 
	
	@Autowired
	private MiniAppPermissionsRepository miniAppPermissionsRepository; 


   @Autowired
   private DocumentIntegrationService documentIntegrationService;
	
/**
* This method is used to export the given list of MiniAppPermissions objects into an excel file.
* It reads an excel template 'MiniAppPermissions.xlsx' from the resource folder 'templates/reports'
* and maps the MiniAppPermissions data onto the template and returns the generated excel file in the form of a byte array.
* param MiniAppPermissions - List of MiniAppPermissions objects to be exported
* @return byte[] - The generated excel file in the form of a byte array
* @throws IOException - When the template file is not found or there is an error reading the file
*/
	@Override
	public byte[] export(List<MiniAppPermissions> miniAppPermissions) throws IOException {
		InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream("templates/reports/MiniAppPermissions.xlsx");
	    XSSFWorkbook xssfWorkbook = new XSSFWorkbook(resourceAsStream); 
		int rowCount = 1;
		return setTableData(miniAppPermissions,xssfWorkbook, rowCount);
	}

/**
 * This method is responsible for setting the data of an Excel document, using a template and a list of MiniAppPermissions objects.
 * The data is written to the template starting at the specified row number.
 * 
 * @param MiniAppPermissions a List of MiniAppPermissions objects, representing the data that will be written to the Excel document
 * @param templatePath an XSSFWorkbook object, representing the template Excel document that the data will be written to
 * @param rowCount an int, representing the starting row number where data will be written in the Excel document
 * @return a byte array of the Excel document after the data has been written to it.
 * @throws IOException if there is an issue reading or writing to the Excel document
 */
/**This method appears to take in three parameters:
A List of MiniAppPermissions objects, representing the data that will be written to the Excel document.
An XSSFWorkbook object, representing the template Excel document that the data will be written to.
An int, representing the starting row number where data will be written in the Excel document.
The method has a return type of byte array, which is the Excel document after the data has been written to it. The method also throws an IOException, which would be thrown if there is an issue reading or writing to the Excel document.
The method starts by creating some maps to hold data that will be used later:
tableColumn: a map that will hold the columns of the Excel table.
identityColumnMapping: a map that will hold the mapping of columns
templateHeaders: a map that will hold the headers of the excel template
then it calls ExcelUtils.parseMappeddJson(tableColumn,identityColumnMapping,templateHeaders); to get the values for the maps created.
Then it creates an instance of ExcelWriter which will write the data to the workbook, it set the active sheet to the first sheet of the workbook and check if MiniAppPermissions list is not empty.
It then iterates over the list of MiniAppPermissions objects and for each MiniAppPermissions, it creates a new row in the Excel document at the specified row number.
It also retrieves the list of columns for the "MiniAppPermissions" entity from the tableColumn map, and iterates over the columns.
For each column, it attempts to retrieve the value for that column from the current MiniAppPermissions object using the ExcelUtils.invokeGetter method, passing in the current MiniAppPermissions object, the column name and the identityColumnMapping.
The value returned by this method is then set as the value of the cell in the current row and column.
If an introspection exception occur it will print the stacktrace of the exception
After all the data is written to the Excel document, the method returns the Excel document as a byte array using excelWriter.toByteArray() and log "going to return file"
* */

	private byte[] setTableData(List<MiniAppPermissions>miniAppPermissions, XSSFWorkbook templatePath, int rowCount)throws IOException {
		Map<String,List<String>> tableColumn=new HashMap<>();
		String entity=ENTITY_NAME;
        Map<String, String> identityColumnMapping =new HashMap<>();
        Map<String,List<String>> templateHeaders = new HashMap<>();
		ExcelUtils.parseMappeddJson(tableColumn,identityColumnMapping,templateHeaders);
		log.info("table column map is :{}",tableColumn);
		try (ExcelWriter excelWriter = new ExcelWriter(templatePath)) {
			excelWriter.getWorkbook().setActiveSheet(0);
			if (CollectionUtils.isNotEmpty(miniAppPermissions)) {
			for (MiniAppPermissions miniAppPermissionsDetails : miniAppPermissions) {
				ExcelRow row = excelWriter.getOrCreateRow(0, rowCount);
				int index = 0;
				List<String> columns = tableColumn.get(entity);
 			for(String column:columns) {
				if(column!=null) {   
				try {
					row.setCellValue(index, ExcelUtils.invokeGetter(miniAppPermissionsDetails,column,identityColumnMapping).toString());
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
 * This method is responsible for importing data from an Excel file, specifically data related to MiniAppPermissions objects.
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
		List<MiniAppPermissions> miniAppPermissionss =new ArrayList<>();
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
        	miniAppPermissionss = saveData(workBook, columnsMapping, columnNames);
      	}
    	else {
      		log.info("columns and headers invalide");
      	}
	if (CollectionUtils.isNotEmpty(miniAppPermissionss)) {
		miniAppPermissionsRepository.saveAll(miniAppPermissionss);
		return APIConstants.SUCCESS_JSON;
	}
		return APIConstants.FAILURE_JSON;
	}

/**
 * This method is responsible for saving data to the database, specifically data related to MiniAppPermissions objects.
 * The method takes in an Excel object, which represents the sheet containing the data, a mapping of columns from the excel sheet to the MiniAppPermissions class, and a list of column names.
 * The method uses the iterator for the sheet to read data row by row, create new MiniAppPermissions objects, and set the properties of the MiniAppPermissions objects using the column mapping and column names.
 * The method returns a list of MiniAppPermissions objects that have been saved to the database.
 * @param sheet an Excel object representing the sheet containing the data
 * @param columnMapping a map representing the mapping of columns from the excel sheet to the MiniAppPermissions class
 * @param columnNames a list of column names of the excel sheet
 * @return a list of MiniAppPermissions objects that have been saved to the database
 */

	public List<MiniAppPermissions> saveData(Excel sheet, Map<String, String> columnMapping, List<String> columnNames) {
		Iterator<ExcelRow> rowIterator = sheet.iterator();
		List<MiniAppPermissions> miniAppPermissionss = new ArrayList<>();
		rowIterator.next();
		while (rowIterator.hasNext()) {
			ExcelRow excelRow = rowIterator.next();
          	MiniAppPermissions miniAppPermissions = new MiniAppPermissions();
            int index = -1;
      	for (String columnName : columnNames) {
        	try {
          		ExcelUtils.invokeSetter(miniAppPermissions, columnName, excelRow.getString(++index));
                } catch (InstantiationException e) {
          	log.error("failed while going to set the value :{}", excelRow.getString(++index));
          	log.error("InstantiationException occurred: {}", e.getMessage());
        } catch (ClassNotFoundException e) {
        log.error("ClassNotFoundException occurred: {}", e.getMessage());
		}
	}
	miniAppPermissionss.add(miniAppPermissions);
 	}
		return miniAppPermissionss;
	} 
/**
* This method is responsible for soft-deleting an MiniAppPermissions  record in the database.
* The method takes in an int id which represents the id of the MiniAppPermissions  that needs to be soft-deleted.
* It uses the id to find the MiniAppPermissions by calling the MiniAppPermissionsRepository.findById method.
* If the MiniAppPermissions  is found, it sets the "deleted" field to true, save the MiniAppPermissions  in the repository, and saves it in the database
* @param id an int representing the id of the MiniAppPermissions  that needs to be soft-deleted
*/
	
	@Override
	public void softDelete(int id) {
		Optional<MiniAppPermissions> miniAppPermissions = miniAppPermissionsRepository.findById(id);
		if (miniAppPermissions.isPresent()) {
			MiniAppPermissions miniAppPermissions1 = miniAppPermissions.get();
			miniAppPermissions1.setDeleted(true);
		    miniAppPermissionsRepository.save(miniAppPermissions1);
		}
	}
	
/**
* This method is responsible for soft-deleting multiple MiniAppPermissions records in the database in bulk.
* The method takes in a List of integers, each representing the id of an MiniAppPermissions that needs to be soft-deleted.
* It iterates through the list, calling the softDelete method for each id passed in the list.
* @param list a List of integers representing the ids of the MiniAppPermissions that need to be soft-deleted
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
 * @param miniAppPermissions The miniAppPermissions  object to create.
 * @return The created vendor object.
 */
	@Override
	public MiniAppPermissions create(MiniAppPermissions miniAppPermissions) {  
		return miniAppPermissionsRepository.save(miniAppPermissions);
	}

}
