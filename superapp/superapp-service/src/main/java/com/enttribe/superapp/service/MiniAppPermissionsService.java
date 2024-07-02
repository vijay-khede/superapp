package com.enttribe.superapp.service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.enttribe.superapp.model.MiniAppPermissions;
import com.enttribe.superapp.service.generic.GenericService;

/**
*
MiniAppPermissionsService interface is a service layer interface which handles all the business logic related to MiniAppPermissions model.
It extends GenericService interface which provides basic CRUD operations.
@author Visionwaves MiniAppPermissions
@version 1.0.0
*
**/

public interface MiniAppPermissionsService extends GenericService<MiniAppPermissions> {

/**
*
This method is used to retrieve audit history for an MiniAppPermissions identified by id.
@param id The id of the MiniAppPermissions whose audit history is to be retrieved.
@param limit The maximum number of records to retrieve.
@param skip The number of records to skip before retrieving.
@return A string representation of the audit history.
*
**/
		String auditHistory(int id, Integer limit, Integer skip);
	
/**
*
This method is used to import MiniAppPermissions data from an excel file.
@param excelFile The excel file containing MiniAppPermissions data.
@return A string indicating the status of the import operation.
@throws IOException If there is an error reading the file.
@throws InstantiationException If there is an error creating an instance of the class.
@throws ClassNotFoundException If the class specified in the file is not found.
*
**/
		String importData(MultipartFile excelFile) throws IOException, InstantiationException, ClassNotFoundException;
	 
/**
*
This method is used to export MiniAppPermissions data to an excel file.
@param miniAppPermissions The list of miniAppPermissions to be exported.
@return A byte array containing the excel file.
@throws IOException If there is an error writing to the file.
*
**/
		byte[] export(List<MiniAppPermissions> miniAppPermissions) throws IOException;
    
/**
*
This method is used to soft delete an MiniAppPermissions identified by id.
@param id The id of the MiniAppPermissions to be soft deleted.
*
**/
		void softDelete(int id);
		
		
		void softBulkDelete(List<Integer> list);
}
