package com.enttribe.superapp.service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.enttribe.superapp.model.OrganisationRole;
import com.enttribe.superapp.service.generic.GenericService;

/**
*
OrganisationRoleService interface is a service layer interface which handles all the business logic related to OrganisationRole model.
It extends GenericService interface which provides basic CRUD operations.
@author Visionwaves OrganisationRole
@version 1.0.0
*
**/

public interface OrganisationRoleService extends GenericService<OrganisationRole> {

/**
*
This method is used to retrieve audit history for an OrganisationRole identified by id.
@param id The id of the OrganisationRole whose audit history is to be retrieved.
@param limit The maximum number of records to retrieve.
@param skip The number of records to skip before retrieving.
@return A string representation of the audit history.
*
**/
		String auditHistory(int id, Integer limit, Integer skip);
	
/**
*
This method is used to import OrganisationRole data from an excel file.
@param excelFile The excel file containing OrganisationRole data.
@return A string indicating the status of the import operation.
@throws IOException If there is an error reading the file.
@throws InstantiationException If there is an error creating an instance of the class.
@throws ClassNotFoundException If the class specified in the file is not found.
*
**/
		String importData(MultipartFile excelFile) throws IOException, InstantiationException, ClassNotFoundException;
	 
/**
*
This method is used to export OrganisationRole data to an excel file.
@param organisationRole The list of organisationRole to be exported.
@return A byte array containing the excel file.
@throws IOException If there is an error writing to the file.
*
**/
		byte[] export(List<OrganisationRole> organisationRole) throws IOException;
    
/**
*
This method is used to soft delete an OrganisationRole identified by id.
@param id The id of the OrganisationRole to be soft deleted.
*
**/
		void softDelete(int id);
		
		
		void softBulkDelete(List<Integer> list);
}
