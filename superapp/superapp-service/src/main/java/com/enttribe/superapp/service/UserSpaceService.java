package com.enttribe.superapp.service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.enttribe.superapp.model.UserSpace;
import com.enttribe.superapp.service.generic.GenericService;

/**
*
UserSpaceService interface is a service layer interface which handles all the business logic related to UserSpace model.
It extends GenericService interface which provides basic CRUD operations.
@author Visionwaves UserSpace
@version 1.0.0
*
**/

public interface UserSpaceService extends GenericService<UserSpace> {

/**
*
This method is used to retrieve audit history for an UserSpace identified by id.
@param id The id of the UserSpace whose audit history is to be retrieved.
@param limit The maximum number of records to retrieve.
@param skip The number of records to skip before retrieving.
@return A string representation of the audit history.
*
**/
		String auditHistory(int id, Integer limit, Integer skip);
	
/**
*
This method is used to import UserSpace data from an excel file.
@param excelFile The excel file containing UserSpace data.
@return A string indicating the status of the import operation.
@throws IOException If there is an error reading the file.
@throws InstantiationException If there is an error creating an instance of the class.
@throws ClassNotFoundException If the class specified in the file is not found.
*
**/
		String importData(MultipartFile excelFile) throws IOException, InstantiationException, ClassNotFoundException;
	 
/**
*
This method is used to export UserSpace data to an excel file.
@param userSpace The list of userSpace to be exported.
@return A byte array containing the excel file.
@throws IOException If there is an error writing to the file.
*
**/
		byte[] export(List<UserSpace> userSpace) throws IOException;
    
/**
*
This method is used to soft delete an UserSpace identified by id.
@param id The id of the UserSpace to be soft deleted.
*
**/
		void softDelete(int id);
		
		
		void softBulkDelete(List<Integer> list);
}
