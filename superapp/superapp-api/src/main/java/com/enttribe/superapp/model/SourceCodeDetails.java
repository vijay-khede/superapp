package com.enttribe.superapp.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.envers.Audited;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Filters;
import org.hibernate.annotations.ParamDef;

// @Audited
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity 
@Setter 
@Getter
@NoArgsConstructor 
@Table(name = "SOURCE_CODE_DETAILS")
@Filters({
    @Filter(name = "sourceCodeDetailsIdEqFilter", condition = "ID = :id"),
    @Filter(name = "sourceCodeDetailsIdNEqFilter", condition = "ID != :id"),
    @Filter(name = "sourceCodeDetailsIdInFilter", condition = "ID in (:id)"),
    @Filter(name = "sourceCodeDetailsIdNInFilter", condition = "ID not in (:id)"),
    @Filter(name = "sourceCodeDetailsAppIdEqFilter", condition = "APP_ID = :appId"),
    @Filter(name = "sourceCodeDetailsAppIdNEqFilter", condition = "APP_ID != :appId"),
    @Filter(name = "sourceCodeDetailsAppIdInFilter", condition = "APP_ID in (:appId)"),
    @Filter(name = "sourceCodeDetailsAppIdNInFilter", condition = "APP_ID not in (:appId)"),
    @Filter(name = "sourceCodeDetailsDeletedEqFilter", condition = "DELETED = :deleted"),
    @Filter(name = "sourceCodeDetailsDeletedNEqFilter", condition = "DELETED != :deleted"),
    @Filter(name = "sourceCodeDetailsCustomerIdEqFilter", condition = "CUSTOMER_ID = :customerId"),
    @Filter(name = "sourceCodeDetailsCustomerIdNEqFilter", condition = "CUSTOMER_ID != :customerId"),
    @Filter(name = "sourceCodeDetailsCustomerIdInFilter", condition = "CUSTOMER_ID in (:customerId)"),
    @Filter(name = "sourceCodeDetailsCustomerIdNInFilter", condition = "CUSTOMER_ID not in (:customerId)"),
    @Filter(name = "sourceCodeDetailsSourceCodePathEqFilter", condition = "SOURCE_CODE_PATH = :sourceCodePath"),
    @Filter(name = "sourceCodeDetailsSourceCodePathNEqFilter", condition = "SOURCE_CODE_PATH != :sourceCodePath"),
    @Filter(name = "sourceCodeDetailsSourceCodePathInFilter", condition = "SOURCE_CODE_PATH in (:sourceCodePath)"),
    @Filter(name = "sourceCodeDetailsSourceCodePathNInFilter", condition = "SOURCE_CODE_PATH not in (:sourceCodePath)"),
    @Filter(name = "sourceCodeDetailsSourceCodeUrlEqFilter", condition = "SOURCE_CODE_URL = :sourceCodeUrl"),
    @Filter(name = "sourceCodeDetailsSourceCodeUrlNEqFilter", condition = "SOURCE_CODE_URL != :sourceCodeUrl"),
    @Filter(name = "sourceCodeDetailsSourceCodeUrlInFilter", condition = "SOURCE_CODE_URL in (:sourceCodeUrl)"),
    @Filter(name = "sourceCodeDetailsSourceCodeUrlNInFilter", condition = "SOURCE_CODE_URL not in (:sourceCodeUrl)"),
    @Filter(name = "sourceCodeDetailsStatusEqFilter", condition = "STATUS = :status"),
    @Filter(name = "sourceCodeDetailsStatusNEqFilter", condition = "STATUS != :status"),
    @Filter(name = "sourceCodeDetailsStatusInFilter", condition = "STATUS in (:status)"),
    @Filter(name = "sourceCodeDetailsStatusNInFilter", condition = "STATUS not in (:status)"),
    @Filter(name = "sourceCodeDetailsVersionEqFilter", condition = "VERSION = :version"),
    @Filter(name = "sourceCodeDetailsVersionNEqFilter", condition = "VERSION != :version"),
    @Filter(name = "sourceCodeDetailsVersionInFilter", condition = "VERSION in (:version)"),
    @Filter(name = "sourceCodeDetailsVersionNInFilter", condition = "VERSION not in (:version)"),
    @Filter(name = "sourceCodeDetailsDartVersionEqFilter", condition = "DART_VERSION = :dartVersion"),
    @Filter(name = "sourceCodeDetailsDartVersionNEqFilter", condition = "DART_VERSION != :dartVersion"),
    @Filter(name = "sourceCodeDetailsDartVersionInFilter", condition = "DART_VERSION in (:dartVersion)"),
    @Filter(name = "sourceCodeDetailsDartVersionNInFilter", condition = "DART_VERSION not in (:dartVersion)"),
    @Filter(name = "sourceCodeDetailsFlutterVersionEqFilter", condition = "FLUTTER_VERSION = :flutterVersion"),
    @Filter(name = "sourceCodeDetailsFlutterVersionNEqFilter", condition = "FLUTTER_VERSION != :flutterVersion"),
    @Filter(name = "sourceCodeDetailsFlutterVersionInFilter", condition = "FLUTTER_VERSION in (:flutterVersion)"),
    @Filter(name = "sourceCodeDetailsFlutterVersionNInFilter", condition = "FLUTTER_VERSION not in (:flutterVersion)"),
    @Filter(name = "sourceCodeDetailsCreatedTimeEqFilter", condition = "CREATED_TIME = :createdTime"),
    @Filter(name = "sourceCodeDetailsCreatedTimeNEqFilter", condition = "CREATED_TIME != :createdTime"),
    @Filter(name = "sourceCodeDetailsCreatedTimeInFilter", condition = "CREATED_TIME in (:createdTime)"),
    @Filter(name = "sourceCodeDetailsCreatedTimeNInFilter", condition = "CREATED_TIME not in (:createdTime)"),
    @Filter(name = "sourceCodeDetailsModifiedTimeEqFilter", condition = "MODIFIED_TIME = :modifiedTime"),
    @Filter(name = "sourceCodeDetailsModifiedTimeNEqFilter", condition = "MODIFIED_TIME != :modifiedTime"),
    @Filter(name = "sourceCodeDetailsModifiedTimeInFilter", condition = "MODIFIED_TIME in (:modifiedTime)"),
    @Filter(name = "sourceCodeDetailsModifiedTimeNInFilter", condition = "MODIFIED_TIME not in (:modifiedTime)"),
    @Filter(name = "sourceCodeDetailsCreatorEqFilter", condition = "CREATOR = :creator"),
    @Filter(name = "sourceCodeDetailsCreatorNEqFilter", condition = "CREATOR != :creator"),
    @Filter(name = "sourceCodeDetailsCreatorInFilter", condition = "CREATOR in (:creator)"),
    @Filter(name = "sourceCodeDetailsCreatorNInFilter", condition = "CREATOR not in (:creator)"),
    @Filter(name = "sourceCodeDetailsLastModifierEqFilter", condition = "LAST_MODIFIER = :lastModifier"),
    @Filter(name = "sourceCodeDetailsLastModifierNEqFilter", condition = "LAST_MODIFIER != :lastModifier"),
    @Filter(name = "sourceCodeDetailsLastModifierInFilter", condition = "LAST_MODIFIER in (:lastModifier)"),
    @Filter(name = "sourceCodeDetailsLastModifierNInFilter", condition = "LAST_MODIFIER not in (:lastModifier)")
}) 
@FilterDefs({
    @FilterDef(name = "sourceCodeDetailsIdEqFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsIdNEqFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsIdInFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsIdNInFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsAppIdEqFilter", parameters = @ParamDef(name = "appId", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsAppIdNEqFilter", parameters = @ParamDef(name = "appId", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsAppIdInFilter", parameters = @ParamDef(name = "appId", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsAppIdNInFilter", parameters = @ParamDef(name = "appId", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsDeletedEqFilter", parameters = @ParamDef(name = "deleted", type = Boolean.class)),
    @FilterDef(name = "sourceCodeDetailsDeletedNEqFilter", parameters = @ParamDef(name = "deleted", type = Boolean.class)),
    @FilterDef(name = "sourceCodeDetailsCustomerIdEqFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsCustomerIdNEqFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsCustomerIdInFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsCustomerIdNInFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsSourceCodePathEqFilter", parameters = @ParamDef(name = "sourceCodePath", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsSourceCodePathNEqFilter", parameters = @ParamDef(name = "sourceCodePath", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsSourceCodePathInFilter", parameters = @ParamDef(name = "sourceCodePath", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsSourceCodePathNInFilter", parameters = @ParamDef(name = "sourceCodePath", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsSourceCodeUrlEqFilter", parameters = @ParamDef(name = "sourceCodeUrl", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsSourceCodeUrlNEqFilter", parameters = @ParamDef(name = "sourceCodeUrl", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsSourceCodeUrlInFilter", parameters = @ParamDef(name = "sourceCodeUrl", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsSourceCodeUrlNInFilter", parameters = @ParamDef(name = "sourceCodeUrl", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsStatusEqFilter", parameters = @ParamDef(name = "status", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsStatusNEqFilter", parameters = @ParamDef(name = "status", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsStatusInFilter", parameters = @ParamDef(name = "status", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsStatusNInFilter", parameters = @ParamDef(name = "status", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsVersionEqFilter", parameters = @ParamDef(name = "version", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsVersionNEqFilter", parameters = @ParamDef(name = "version", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsVersionInFilter", parameters = @ParamDef(name = "version", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsVersionNInFilter", parameters = @ParamDef(name = "version", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsDartVersionEqFilter", parameters = @ParamDef(name = "dartVersion", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsDartVersionNEqFilter", parameters = @ParamDef(name = "dartVersion", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsDartVersionInFilter", parameters = @ParamDef(name = "dartVersion", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsDartVersionNInFilter", parameters = @ParamDef(name = "dartVersion", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsFlutterVersionEqFilter", parameters = @ParamDef(name = "flutterVersion", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsFlutterVersionNEqFilter", parameters = @ParamDef(name = "flutterVersion", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsFlutterVersionInFilter", parameters = @ParamDef(name = "flutterVersion", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsFlutterVersionNInFilter", parameters = @ParamDef(name = "flutterVersion", type = String.class)),
    @FilterDef(name = "sourceCodeDetailsCreatorEqFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsCreatorNEqFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsCreatorInFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsCreatorNInFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsLastModifierEqFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsLastModifierNEqFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsLastModifierInFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "sourceCodeDetailsLastModifierNInFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class))
}) 

public class SourceCodeDetails extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT")
    private Integer id;

    @NotNull
    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean deleted;

    @Column(name = "CUSTOMER_ID", columnDefinition = "INT")
    private Integer customerId;

    @Size(max = 255)
    @Column(name = "SOURCE_CODE_PATH", length = 255)
    private String sourceCodePath;

    @Size(max = 255)
    @Column(name = "SOURCE_CODE_MINIO_PATH", length = 255)
    private String sourceCodeMinioPath;

    @Size(max = 255)
    @Column(name = "SOURCE_CODE_URL", length = 255)
    private String sourceCodeUrl;

    @Basic
    @Column(name = "STATUS", columnDefinition = "ENUM('NEW','PASS','FAIL','EXTRACT_CODE','INSTALL_DEPENDENCIES','BUILD','COMPILED')")
    private String status; 

    @Size(max = 15)
    @Column(name = "VERSION", length = 15)
    private String version;

    @Size(max = 15)
    @Column(name = "DART_VERSION", length = 15)
    private String dartVersion;

    @Size(max = 15)
    @Column(name = "FLUTTER_VERSION", length = 15)
    private String flutterVersion;

    @ManyToOne
    @JoinColumn(name = "APP_ID", referencedColumnName = "ID", nullable = false)
    private MiniappDetails miniAppDetails; 

    
  

}
