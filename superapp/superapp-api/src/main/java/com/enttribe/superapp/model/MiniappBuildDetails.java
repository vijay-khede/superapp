package com.enttribe.superapp.model;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; 

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Filters;
import org.hibernate.annotations.ParamDef; 

/**
 * Auto-generated by:
 * org.apache.openjpa.jdbc.meta.ReverseMappingTool$AnnotatedCodeGenerator
 */  
// @Audited 
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity 
@Setter
@Getter 
@NoArgsConstructor 
@AllArgsConstructor
@Table(name = "MINIAPP_BUILD_DETAILS")
@Filters(value = { @Filter(name = "miniappBuildDetailsCompiledFileUrlNInFilter", condition = "COMPILED_FILE_URL not in (:compiledFileUrl)"), @Filter(name = "miniappBuildDetailsCompiledFileUrlEqFilter", condition = "COMPILED_FILE_URL = :compiledFileUrl"), @Filter(name = "miniappBuildDetailsCompiledFileUrlNEqFilter", condition = "COMPILED_FILE_URL != :compiledFileUrl"), @Filter(name = "miniappBuildDetailsCompiledFileUrlInFilter", condition = "COMPILED_FILE_URL in (:compiledFileUrl)"), @Filter(name = "miniappBuildDetailsCustomerIdGtFilter", condition = "CUSTOMER_ID > :customerId"), @Filter(name = "miniappBuildDetailsCustomerIdNInFilter", condition = "CUSTOMER_ID not in (:customerId)"), @Filter(name = "miniappBuildDetailsCustomerIdLtEqFilter", condition = "CUSTOMER_ID <= :customerId"), @Filter(name = "miniappBuildDetailsCustomerIdLtFilter", condition = "CUSTOMER_ID < :customerId"), @Filter(name = "miniappBuildDetailsCustomerIdEqFilter", condition = "CUSTOMER_ID = :customerId"), @Filter(name = "miniappBuildDetailsCustomerIdNEqFilter", condition = "CUSTOMER_ID != :customerId"), @Filter(name = "miniappBuildDetailsCustomerIdInFilter", condition = "CUSTOMER_ID in (:customerId)"), @Filter(name = "miniappBuildDetailsCustomerIdBwFilter", condition = "CUSTOMER_ID > :customerId_MIN  AND CUSTOMER_ID < :customerId_MAX"), @Filter(name = "miniappBuildDetailsCustomerIdGtEqFilter", condition = "CUSTOMER_ID >= :customerId"), @Filter(name = "miniappBuildDetailsCustomerIdEqFilter", condition = "CUSTOMER_ID = :customerId"), @Filter(name = "miniappBuildDetailsIdGtFilter", condition = "ID > :id"), @Filter(name = "miniappBuildDetailsIdNInFilter", condition = "ID not in (:id)"), @Filter(name = "miniappBuildDetailsIdLtEqFilter", condition = "ID <= :id"), @Filter(name = "miniappBuildDetailsIdLtFilter", condition = "ID < :id"), @Filter(name = "miniappBuildDetailsIdEqFilter", condition = "ID = :id"), @Filter(name = "miniappBuildDetailsIdNEqFilter", condition = "ID != :id"), @Filter(name = "miniappBuildDetailsIdInFilter", condition = "ID in (:id)"), @Filter(name = "miniappBuildDetailsIdBwFilter", condition = "ID > :id_MIN  AND ID < :id_MAX"), @Filter(name = "miniappBuildDetailsIdGtEqFilter", condition = "ID >= :id"), @Filter(name = "miniappBuildDetailsIdEqFilter", condition = "ID = :id"), @Filter(name = "miniappBuildDetailsMiniappDetailsTaggingNInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.TAGGING not in (:tagging)"), @Filter(name = "miniappBuildDetailsMiniappDetailsTaggingEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.TAGGING = :tagging)"), @Filter(name = "miniappBuildDetailsMiniappDetailsTaggingNEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.TAGGING != :tagging)"), @Filter(name = "miniappBuildDetailsMiniappDetailsTaggingInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.TAGGING in (:tagging)"), @Filter(name = "miniappBuildDetailsMiniappDetailsNameNInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.NAME not in (:name)"), @Filter(name = "miniappBuildDetailsMiniappDetailsNameEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.NAME = :name)"), @Filter(name = "miniappBuildDetailsMiniappDetailsNameNEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.NAME != :name)"), @Filter(name = "miniappBuildDetailsMiniappDetailsNameInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.NAME in (:name)"), @Filter(name = "miniappBuildDetailsMiniappDetailsApplicationKeyNInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.APPLICATION_KEY not in (:applicationKey)"), @Filter(name = "miniappBuildDetailsMiniappDetailsApplicationKeyEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.APPLICATION_KEY = :applicationKey)"), @Filter(name = "miniappBuildDetailsMiniappDetailsApplicationKeyNEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.APPLICATION_KEY != :applicationKey)"), @Filter(name = "miniappBuildDetailsMiniappDetailsApplicationKeyInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.APPLICATION_KEY in (:applicationKey)"), @Filter(name = "miniappBuildDetailsMiniappDetailsDescriptionNInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.DESCRIPTION not in (:description)"), @Filter(name = "miniappBuildDetailsMiniappDetailsDescriptionEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.DESCRIPTION = :description)"), @Filter(name = "miniappBuildDetailsMiniappDetailsDescriptionNEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.DESCRIPTION != :description)"), @Filter(name = "miniappBuildDetailsMiniappDetailsDescriptionInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.DESCRIPTION in (:description)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIconUrlNInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ICON_URL not in (:iconUrl)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIconUrlEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ICON_URL = :iconUrl)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIconUrlNEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ICON_URL != :iconUrl)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIconUrlInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ICON_URL in (:iconUrl)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIdGtFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ID > :id)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIdNInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ID not in (:id)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIdLtEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ID <= :id)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIdLtFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ID < :id)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIdEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ID = :id)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIdNEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ID != :id)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIdInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ID in (:id)"), @Filter(name = "miniappBuildDetailsMiniappDetailsIdBwFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ID > :id_MIN  AND MINIAPP_DETAILS.ID < :id_MAX )"), @Filter(name = "miniappBuildDetailsMiniappDetailsIdGtEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.ID >= :id)"), @Filter(name = "miniappBuildDetailsMiniappDetailsVersionNInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.VERSION not in (:version)"), @Filter(name = "miniappBuildDetailsMiniappDetailsVersionEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.VERSION = :version)"), @Filter(name = "miniappBuildDetailsMiniappDetailsVersionNEqFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.VERSION != :version)"), @Filter(name = "miniappBuildDetailsMiniappDetailsVersionInFilter", condition = "APP_ID in (select MINIAPP_DETAILS.id from MINIAPP_DETAILS where MINIAPP_DETAILS.VERSION in (:version)"), @Filter(name = "miniappBuildDetailsSourceCodePathNInFilter", condition = "SOURCE_CODE_PATH not in (:sourceCodePath)"), @Filter(name = "miniappBuildDetailsSourceCodePathEqFilter", condition = "SOURCE_CODE_PATH = :sourceCodePath"), @Filter(name = "miniappBuildDetailsSourceCodePathNEqFilter", condition = "SOURCE_CODE_PATH != :sourceCodePath"), @Filter(name = "miniappBuildDetailsSourceCodePathInFilter", condition = "SOURCE_CODE_PATH in (:sourceCodePath)"), @Filter(name = "miniappBuildDetailsSourceCodeUrlNInFilter", condition = "SOURCE_CODE_URL not in (:sourceCodeUrl)"), @Filter(name = "miniappBuildDetailsSourceCodeUrlEqFilter", condition = "SOURCE_CODE_URL = :sourceCodeUrl"), @Filter(name = "miniappBuildDetailsSourceCodeUrlNEqFilter", condition = "SOURCE_CODE_URL != :sourceCodeUrl"), @Filter(name = "miniappBuildDetailsSourceCodeUrlInFilter", condition = "SOURCE_CODE_URL in (:sourceCodeUrl)"), @Filter(name = "miniappBuildDetailsStatusNInFilter", condition = "STATUS not in (:status)"), @Filter(name = "miniappBuildDetailsStatusEqFilter", condition = "STATUS = :status"), @Filter(name = "miniappBuildDetailsStatusNEqFilter", condition = "STATUS != :status"), @Filter(name = "miniappBuildDetailsStatusInFilter", condition = "STATUS in (:status)") })
@FilterDefs(value = { @FilterDef(name = "miniappBuildDetailsCompiledFileUrlNInFilter", parameters = { @ParamDef(name = "compiledFileUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsCompiledFileUrlEqFilter", parameters = { @ParamDef(name = "compiledFileUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsCompiledFileUrlNEqFilter", parameters = { @ParamDef(name = "compiledFileUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsCompiledFileUrlInFilter", parameters = { @ParamDef(name = "compiledFileUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsCustomerIdGtFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsCustomerIdNInFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsCustomerIdLtEqFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsCustomerIdLtFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsCustomerIdEqFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsCustomerIdNEqFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsCustomerIdInFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsCustomerIdBwFilter", parameters = { @ParamDef(name = "customerId_MIN", type = Integer.class), @ParamDef(name = "customerId_MAX", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsCustomerIdGtEqFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsIdGtFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsIdNInFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsIdLtEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsIdLtFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsIdEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsIdNEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsIdInFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsIdBwFilter", parameters = { @ParamDef(name = "id_MIN", type = Integer.class), @ParamDef(name = "id_MAX", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsIdGtEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsTaggingNInFilter", parameters = { @ParamDef(name = "tagging", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsTaggingEqFilter", parameters = { @ParamDef(name = "tagging", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsTaggingNEqFilter", parameters = { @ParamDef(name = "tagging", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsTaggingInFilter", parameters = { @ParamDef(name = "tagging", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsNameNInFilter", parameters = { @ParamDef(name = "name", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsNameEqFilter", parameters = { @ParamDef(name = "name", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsNameNEqFilter", parameters = { @ParamDef(name = "name", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsNameInFilter", parameters = { @ParamDef(name = "name", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsApplicationKeyNInFilter", parameters = { @ParamDef(name = "applicationKey", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsApplicationKeyEqFilter", parameters = { @ParamDef(name = "applicationKey", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsApplicationKeyNEqFilter", parameters = { @ParamDef(name = "applicationKey", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsApplicationKeyInFilter", parameters = { @ParamDef(name = "applicationKey", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsDescriptionNInFilter", parameters = { @ParamDef(name = "description", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsDescriptionEqFilter", parameters = { @ParamDef(name = "description", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsDescriptionNEqFilter", parameters = { @ParamDef(name = "description", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsDescriptionInFilter", parameters = { @ParamDef(name = "description", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIconUrlNInFilter", parameters = { @ParamDef(name = "iconUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIconUrlEqFilter", parameters = { @ParamDef(name = "iconUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIconUrlNEqFilter", parameters = { @ParamDef(name = "iconUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIconUrlInFilter", parameters = { @ParamDef(name = "iconUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIdGtFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIdNInFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIdLtEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIdLtFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIdEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIdNEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIdInFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIdBwFilter", parameters = { @ParamDef(name = "id_MIN", type = Integer.class), @ParamDef(name = "id_MAX", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsIdGtEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsVersionNInFilter", parameters = { @ParamDef(name = "version", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsVersionEqFilter", parameters = { @ParamDef(name = "version", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsVersionNEqFilter", parameters = { @ParamDef(name = "version", type = String.class) }), @FilterDef(name = "miniappBuildDetailsMiniappDetailsVersionInFilter", parameters = { @ParamDef(name = "version", type = String.class) }), @FilterDef(name = "miniappBuildDetailsSourceCodePathNInFilter", parameters = { @ParamDef(name = "sourceCodePath", type = String.class) }), @FilterDef(name = "miniappBuildDetailsSourceCodePathEqFilter", parameters = { @ParamDef(name = "sourceCodePath", type = String.class) }), @FilterDef(name = "miniappBuildDetailsSourceCodePathNEqFilter", parameters = { @ParamDef(name = "sourceCodePath", type = String.class) }), @FilterDef(name = "miniappBuildDetailsSourceCodePathInFilter", parameters = { @ParamDef(name = "sourceCodePath", type = String.class) }), @FilterDef(name = "miniappBuildDetailsSourceCodeUrlNInFilter", parameters = { @ParamDef(name = "sourceCodeUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsSourceCodeUrlEqFilter", parameters = { @ParamDef(name = "sourceCodeUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsSourceCodeUrlNEqFilter", parameters = { @ParamDef(name = "sourceCodeUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsSourceCodeUrlInFilter", parameters = { @ParamDef(name = "sourceCodeUrl", type = String.class) }), @FilterDef(name = "miniappBuildDetailsStatusNInFilter", parameters = { @ParamDef(name = "status", type = String.class) }), @FilterDef(name = "miniappBuildDetailsStatusEqFilter", parameters = { @ParamDef(name = "status", type = String.class) }), @FilterDef(name = "miniappBuildDetailsStatusNEqFilter", parameters = { @ParamDef(name = "status", type = String.class) }), @FilterDef(name = "miniappBuildDetailsStatusInFilter", parameters = { @ParamDef(name = "status", type = String.class) }) })
public class MiniappBuildDetails extends BaseEntity {

    @Size(max = 255)
    @Basic
    @Column(name = "COMPILED_FILE_URL")
    private String compiledFileUrl;
    
    @Basic
    @Column(name = "CUSTOMER_ID", columnDefinition = "INT")
    private Integer customerId;
    
    @Basic
    private boolean deleted;
    
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Id
    @Column(columnDefinition = "INT")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "APP_ID", columnDefinition = "INT")
    private MiniappDetails miniappDetails;
    
    @Size(max = 255)
    @Basic
    @Column(name = "SOURCE_CODE_PATH")
    private String sourceCodePath;
    
    @Size(max = 255)
    @Basic
    @Column(name = "SOURCE_CODE_URL")
    private String sourceCodeUrl;
    
    @Basic
    @Column(name = "STATUS", columnDefinition = "ENUM('NEW','PASS','FAIL')")
    private String status; 

}
