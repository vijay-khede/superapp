package com.enttribe.superapp.service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.enttribe.superapp.model.BuildInfo;
import com.enttribe.superapp.service.generic.GenericService;

/**
*
BuildInfoService interface is a service layer interface which handles all the business logic related to BuildInfo model.
It extends GenericService interface which provides basic CRUD operations.
@author Visionwaves BuildInfo
@version 1.0.0
*
**/

public interface BuildInfoService extends GenericService<BuildInfo> {

/**
*
This method is used to retrieve audit history for an BuildInfo identified by id.
@param id The id of the BuildInfo whose audit history is to be retrieved.
@param limit The maximum number of records to retrieve.
@param skip The number of records to skip before retrieving.
@return A string representation of the audit history.
*
**/
		String auditHistory(int id, Integer limit, Integer skip);
	
/**
*
This method is used to import BuildInfo data from an excel file.
@param excelFile The excel file containing BuildInfo data.
@return A string indicating the status of the import operation.
@throws IOException If there is an error reading the file.
@throws InstantiationException If there is an error creating an instance of the class.
@throws ClassNotFoundException If the class specified in the file is not found.
*
**/
		String importData(MultipartFile excelFile) throws IOException, InstantiationException, ClassNotFoundException;
	 
/**
*
This method is used to export BuildInfo data to an excel file.
@param buildInfo The list of buildInfo to be exported.
@return A byte array containing the excel file.
@throws IOException If there is an error writing to the file.
*
**/
		byte[] export(List<BuildInfo> buildInfo) throws IOException;
    
/**
*
This method is used to soft delete an BuildInfo identified by id.
@param id The id of the BuildInfo to be soft deleted.
*
**/
		void softDelete(int id);
		
		
		void softBulkDelete(List<Integer> list);
}
