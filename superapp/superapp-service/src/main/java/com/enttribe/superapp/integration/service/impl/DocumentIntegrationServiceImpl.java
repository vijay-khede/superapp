
package com.enttribe.superapp.integration.service.impl; 
 
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
 
import com.google.gson.Gson;
import com.enttribe.core.generic.exceptions.application.BusinessException;
import com.enttribe.document.rest.IDocumentStreamRest;
import com.enttribe.document.wrapper.UploadWrapper;
import com.enttribe.superapp.integration.service.DocumentIntegrationService;
import com.enttribe.superapp.util.APIConstants;
import com.enttribe.document.rest.IDocumentIntegrationRest;
import com.enttribe.document.rest.IDocumentRest;
import com.enttribe.document.model.SubFolder;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.extern.slf4j.Slf4j;
import com.enttribe.document.model.Document;
import org.springframework.http.ResponseEntity;
import com.enttribe.document.wrapper.SubFolderWrapper;
import java.util.List;
 
/**
* The DocumentIntegrationServiceImpl class is an implementation of the DocsumentIntegrationService interface.
* This class provides methods to manage documents and attachments.
*
* It is marked with the Spring Framework's @Service annotation to indicate that this class
* is a service component and should be automatically discovered and registered as a Spring bean.
*
* It also uses the Lombok @Slf4j annotation to automatically generate a logger field named "log".
* This logger can be used to log messages and simplify logging throughout the class.
*/
@Service
@Slf4j
public class DocumentIntegrationServiceImpl implements DocumentIntegrationService {
 
    @Autowired
    private IDocumentStreamRest documentStreamRest;
    
    @Autowired
    private IDocumentIntegrationRest documentIntegrationRest;
        
    @Autowired
    private IDocumentRest documentRest;
    
    public static final String ENTITY_STRING = "ENTITY";
 
 
    @Override
    public Document uploadDocument(MultipartFile file, String fileName, String referenceId,String applicatoinName, String entityName) {
        log.info("inside upload document");
        try {
            log.info("Getting Parent Folder");
            SubFolder parentfolderByValue = documentIntegrationRest.getSubFolderByReferenceValueAndType("APPLICATIONNAME",
                    applicatoinName, null);
            
            if (parentfolderByValue == null) {
                throw new BusinessException("Application Folder Not Exist");
            }
            log.info("Getting Entity Folder");
            SubFolder entityfolderByValue = documentIntegrationRest.getSubFolderByReferenceValueAndType(ENTITY_STRING,
                    entityName, parentfolderByValue.getId());
            
            if (entityfolderByValue == null) {
                throw new BusinessException("Entity Folder Not Exist");
            }
            
            String referenceValue = applicatoinName + "_" + entityName + "_" + referenceId;
            UploadWrapper uploadWrapper = new UploadWrapper();
            uploadWrapper.setFileName(fileName);
            uploadWrapper.setIsPublic(true);
            uploadWrapper.setIsRoot(false);
            uploadWrapper.setIsProcessedDocument(false);
            uploadWrapper.setUserIds(null);
            uploadWrapper.setIsVersioningRequired(true);
            uploadWrapper.setRefType(ENTITY_STRING);
            uploadWrapper.setRefValue(referenceValue);
            
             String folderReferenceValue =  entityName + "_" + referenceId;
            
            log.info("Getting Entity Sub Folder");
            SubFolder entitytSubFolderByValue = documentIntegrationRest.getSubFolderByReferenceValueAndType(ENTITY_STRING,
                    folderReferenceValue, entityfolderByValue.getId());
 
            if (entitytSubFolderByValue == null) {
                entitytSubFolderByValue = createSubFolder(referenceId,folderReferenceValue,entityfolderByValue.getId());
            }
 
            uploadWrapper.setFolderId(entitytSubFolderByValue.getId());
            JSONObject jsonObject = new JSONObject(uploadWrapper);
            log.info("uploadDocument Json Obj", jsonObject);
            log.info("uploadDocument Json Obj1", jsonObject.toString());
 
            log.info("uploadDocument Obj2", new Gson().toJson(uploadWrapper));
            return documentStreamRest.uploadFile(file, jsonObject.toString());
        } catch (Exception ex) {
            log.info("", ex);
            throw new BusinessException(ex.getMessage());
        }
    }
 
    private SubFolder createSubFolder(String referenceId,String referenceValue,Integer parentId) {
        log.info("createSubFolder");
        SubFolderWrapper subFolder = new SubFolderWrapper();
        log.info("SUBFOLDER NAME", referenceValue);
        subFolder.setSubFolderName(referenceValue);
        subFolder.setIsPublic(true);
        subFolder.setIsRoot(false);
        subFolder.setIsProcessDocument(true);
        subFolder.setReferenceId((long)(Integer.parseInt(referenceId)));
        subFolder.setReferenceType(ENTITY_STRING);
        subFolder.setReferenceValue(referenceValue);
        subFolder.setParentSubFolderId(parentId);
        return documentIntegrationRest.createFolder(subFolder);
    }
    
    @Override
      public String deleteFileEntityAttachment(Integer documentIdPk) {  
            log.info( "deleteFileEntityAttachment documentIdPk:{}", documentIdPk);    
        try {
          return documentRest.deleteDocument(documentIdPk);
        } catch (Exception ex) {
          throw new BusinessException(ex.getMessage());
        }
      }
    
    @Override
      public ResponseEntity downloadAttachment(Integer documentIdPk) {
        log.info( "downloadAttachment documentIdPk:{}", documentIdPk);
        try {
          return documentStreamRest.fileDownload(documentIdPk);
        } catch (Exception ex) {
          throw new BusinessException(ex.getMessage());
        }
      }
 
    @Override
    public Integer countOfMyDocuments(Integer parentId, String searchText) {
            log.info( "countOfMyDocuments searchText:{}", searchText);  
          try {
              return documentIntegrationRest.countOfMyDocuments(parentId, searchText);
            } catch (Exception ex) {
              throw new BusinessException(ex.getMessage());
            }
    }
 
    @Override
    public List getMyDocuments(Integer parentId, Integer upperLimit, Integer lowerLimit, String modifiedTimeType,
            Long modificationtime, String searchText) {
                        log.info( "getMyDocuments searchText:{}", searchText);              
          try {
              return documentIntegrationRest.getMyDocuments(parentId, upperLimit, lowerLimit, modifiedTimeType, modificationtime, searchText);
            } catch (Exception ex) {
              throw new BusinessException(ex.getMessage());
            }
    }
    
    @Override
      public SubFolder getSubFolderByReferenceValueAndType(String referenceType, String referenceValue) {
        log.info("getSubFolderByReferenceIdAndType");
        SubFolder subFolderObj = documentIntegrationRest.getSubFolderByReferenceValueAndType(referenceType, referenceValue,null);
        log.info("subFolderObj :{}",subFolderObj);
        return subFolderObj;
      }
 
      @Override
      public void createFolderForEntity(String entityType,Integer entityId) {
        try {
            String appName=APIConstants.APPNAME;
          SubFolderWrapper subFolderWrapper =null;
          // Need to revisit
          String  entityIDReferenceValue=appName+"_"+entityType+"_"+entityId;
          SubFolder entitySubFolder = getSubFolderByReferenceValueAndType(APIConstants.ENTITY,entityIDReferenceValue);
          log.info("inside @class DocumentIntegrationServiceImpl  @method createFolder entitySubFolder {} :",
                  entitySubFolder);
          if(entitySubFolder==null)
          {
               SubFolder appSubFolder = getSubFolderByReferenceValueAndType(APIConstants.APPLICATIONNAME,appName);
               
               log.info("inside @class DocumentIntegrationServiceImpl  @method createFolder appSubFolder {} :",
                       appSubFolder);
               if(appSubFolder==null)
               {
                   subFolderWrapper=new SubFolderWrapper();
                    subFolderWrapper.setSubFolderName(appName);
                      subFolderWrapper.setReferenceType(APIConstants.APPLICATIONNAME);
                      subFolderWrapper.setReferenceValue(appName);
                      setCommonParameter(subFolderWrapper);
                      subFolderWrapper.setIsRoot(true
                      );
                      appSubFolder=    documentIntegrationRest.createFolder(subFolderWrapper);
               }
               
                subFolderWrapper=new SubFolderWrapper();
                subFolderWrapper.setSubFolderName(entityType+"_"+entityId);
                  subFolderWrapper.setReferenceType(APIConstants.ENTITY);
                  subFolderWrapper.setReferenceValue(entityIDReferenceValue);
                  subFolderWrapper.setRelativePath(entityIDReferenceValue);
                  log.info("subFolderWrapper {} :",subFolderWrapper);
                  if(entityId!=null)
                  {
                    log.info("inside if body : {} ",entityId);
                  if (appSubFolder != null) {
                      subFolderWrapper.setParentSubFolderId(appSubFolder.getId());
                    }
                    setCommonParameter(subFolderWrapper);
                  }
               
                  log.info("subFolderWrapper last obj : {} ",subFolderWrapper);
                  SubFolder childFolderCreated = new SubFolder();
                  childFolderCreated =documentIntegrationRest.createFolder(subFolderWrapper);
                  log.info("childFolderCreated last obj : {} ",childFolderCreated);
          }
         
        } catch (Exception ex) {
          log.info("error @class DocumentIntegrationServiceImpl @method createFolder exception : ", ex);
        }
      }
    
      public void setCommonParameter(SubFolderWrapper subfolderWrapper) {
        subfolderWrapper.setIsPublic(false);
        subfolderWrapper.setIsRoot(false);
        subfolderWrapper.setIsProcessDocument(true);
      }
}
 
