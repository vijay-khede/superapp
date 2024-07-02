package com.enttribe.superapp.model;

import jakarta.persistence.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Filters;
import org.hibernate.annotations.ParamDef;
import org.hibernate.envers.Audited;

@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity 
@Table(name = "BUILD_LOG_INFO")
@Setter
@Getter 
@NoArgsConstructor 
@AllArgsConstructor
@Filters({
    @Filter(name = "buildLogInfoIdEqFilter", condition = "ID = :id"),
    @Filter(name = "buildLogInfoIdNEqFilter", condition = "ID != :id"),
    @Filter(name = "buildLogInfoIdInFilter", condition = "ID in (:id)"),
    @Filter(name = "buildLogInfoIdNInFilter", condition = "ID not in (:id)"),
    @Filter(name = "buildLogInfoBuildNumberEqFilter", condition = "BUILD_NUMBER = :buildNumber"),
    @Filter(name = "buildLogInfoBuildNumberNEqFilter", condition = "BUILD_NUMBER != :buildNumber"),
    @Filter(name = "buildLogInfoBuildNumberInFilter", condition = "BUILD_NUMBER in (:buildNumber)"),
    @Filter(name = "buildLogInfoBuildNumberNInFilter", condition = "BUILD_NUMBER not in (:buildNumber)"),
    @Filter(name = "buildLogInfoDeletedEqFilter", condition = "DELETED = :deleted"),
    @Filter(name = "buildLogInfoDeletedNEqFilter", condition = "DELETED != :deleted"),
    @Filter(name = "buildLogInfoCustomerIdEqFilter", condition = "CUSTOMER_ID = :customerId"),
    @Filter(name = "buildLogInfoCustomerIdNEqFilter", condition = "CUSTOMER_ID != :customerId"),
    @Filter(name = "buildLogInfoCustomerIdInFilter", condition = "CUSTOMER_ID in (:customerId)"),
    @Filter(name = "buildLogInfoCustomerIdNInFilter", condition = "CUSTOMER_ID not in (:customerId)"),
    @Filter(name = "buildLogInfoCreatedTimeEqFilter", condition = "CREATED_TIME = :createdTime"),
    @Filter(name = "buildLogInfoCreatedTimeNEqFilter", condition = "CREATED_TIME != :createdTime"),
    @Filter(name = "buildLogInfoCreatedTimeInFilter", condition = "CREATED_TIME in (:createdTime)"),
    @Filter(name = "buildLogInfoCreatedTimeNInFilter", condition = "CREATED_TIME not in (:createdTime)"),
    @Filter(name = "buildLogInfoModifiedTimeEqFilter", condition = "MODIFIED_TIME = :modifiedTime"),
    @Filter(name = "buildLogInfoModifiedTimeNEqFilter", condition = "MODIFIED_TIME != :modifiedTime"),
    @Filter(name = "buildLogInfoModifiedTimeInFilter", condition = "MODIFIED_TIME in (:modifiedTime)"),
    @Filter(name = "buildLogInfoModifiedTimeNInFilter", condition = "MODIFIED_TIME not in (:modifiedTime)"),
    @Filter(name = "buildLogInfoCreatorEqFilter", condition = "CREATOR = :creator"),
    @Filter(name = "buildLogInfoCreatorNEqFilter", condition = "CREATOR != :creator"),
    @Filter(name = "buildLogInfoCreatorInFilter", condition = "CREATOR in (:creator)"),
    @Filter(name = "buildLogInfoCreatorNInFilter", condition = "CREATOR not in (:creator)"),
    @Filter(name = "buildLogInfoLastModifierEqFilter", condition = "LAST_MODIFIER = :lastModifier"),
    @Filter(name = "buildLogInfoLastModifierNEqFilter", condition = "LAST_MODIFIER != :lastModifier"),
    @Filter(name = "buildLogInfoLastModifierInFilter", condition = "LAST_MODIFIER in (:lastModifier)"),
    @Filter(name = "buildLogInfoLastModifierNInFilter", condition = "LAST_MODIFIER not in (:lastModifier)")
})
@FilterDefs({
    @FilterDef(name = "buildLogInfoIdEqFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "buildLogInfoIdNEqFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "buildLogInfoIdInFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "buildLogInfoIdNInFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "buildLogInfoBuildNumberEqFilter", parameters = @ParamDef(name = "buildNumber", type = Integer.class)),
    @FilterDef(name = "buildLogInfoBuildNumberNEqFilter", parameters = @ParamDef(name = "buildNumber", type = Integer.class)),
    @FilterDef(name = "buildLogInfoBuildNumberInFilter", parameters = @ParamDef(name = "buildNumber", type = Integer.class)),
    @FilterDef(name = "buildLogInfoBuildNumberNInFilter", parameters = @ParamDef(name = "buildNumber", type = Integer.class)),
    @FilterDef(name = "buildLogInfoDeletedEqFilter", parameters = @ParamDef(name = "deleted", type = Boolean.class)),
    @FilterDef(name = "buildLogInfoDeletedNEqFilter", parameters = @ParamDef(name = "deleted", type = Boolean.class)),
    @FilterDef(name = "buildLogInfoCustomerIdEqFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "buildLogInfoCustomerIdNEqFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "buildLogInfoCustomerIdInFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "buildLogInfoCustomerIdNInFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "buildLogInfoCreatedTimeEqFilter", parameters = @ParamDef(name = "createdTime", type = Date.class)),
    @FilterDef(name = "buildLogInfoCreatedTimeNEqFilter", parameters = @ParamDef(name = "createdTime", type = Date.class)),
    @FilterDef(name = "buildLogInfoCreatedTimeInFilter", parameters = @ParamDef(name = "createdTime", type = Date.class)),
    @FilterDef(name = "buildLogInfoCreatedTimeNInFilter", parameters = @ParamDef(name = "createdTime", type = Date.class)),
    @FilterDef(name = "buildLogInfoModifiedTimeEqFilter", parameters = @ParamDef(name = "modifiedTime", type = Date.class)),
    @FilterDef(name = "buildLogInfoModifiedTimeNEqFilter", parameters = @ParamDef(name = "modifiedTime", type = Date.class)),
    @FilterDef(name = "buildLogInfoModifiedTimeInFilter", parameters = @ParamDef(name = "modifiedTime", type = Date.class)),
    @FilterDef(name = "buildLogInfoModifiedTimeNInFilter", parameters = @ParamDef(name = "modifiedTime", type = Date.class)),
    @FilterDef(name = "buildLogInfoCreatorEqFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "buildLogInfoCreatorNEqFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "buildLogInfoCreatorInFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "buildLogInfoCreatorNInFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "buildLogInfoLastModifierEqFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "buildLogInfoLastModifierNEqFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "buildLogInfoLastModifierInFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "buildLogInfoLastModifierNInFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class))
})
public class BuildLogInfo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Integer id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "BUILD_NUMBER", referencedColumnName = "BUILD_NUMBER")
    private BuildInfo buildInfo;

    @Column(name="LOG")
    private String log;

    @NotNull
    @Column(name="DELETED",nullable = false, columnDefinition = "TINYINT(1)")
    private boolean deleted;

    @Column(name = "CUSTOMER_ID", columnDefinition = "INT")
    private Integer customerId;


    
}