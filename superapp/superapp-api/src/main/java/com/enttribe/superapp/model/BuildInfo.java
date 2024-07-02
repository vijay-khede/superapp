package com.enttribe.superapp.model;


import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.envers.Audited;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Filters;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity 
@Setter
@Getter 
@NoArgsConstructor 
@AllArgsConstructor
@Table(name = "BUILD_INFO")
@Filters({
    @Filter(name = "buildInfoBuildNumberEqFilter", condition = "BUILD_NUMBER = :buildNumber"),
    @Filter(name = "buildInfoBuildNumberNEqFilter", condition = "BUILD_NUMBER != :buildNumber"),
    @Filter(name = "buildInfoBuildNumberInFilter", condition = "BUILD_NUMBER in (:buildNumber)"),
    @Filter(name = "buildInfoBuildNumberNInFilter", condition = "BUILD_NUMBER not in (:buildNumber)"),
    @Filter(name = "buildInfoAppIdEqFilter", condition = "APP_ID = :appId"),
    @Filter(name = "buildInfoAppIdNEqFilter", condition = "APP_ID != :appId"),
    @Filter(name = "buildInfoAppIdInFilter", condition = "APP_ID in (:appId)"),
    @Filter(name = "buildInfoAppIdNInFilter", condition = "APP_ID not in (:appId)"),
    @Filter(name = "buildInfoStatusEqFilter", condition = "STATUS = :status"),
    @Filter(name = "buildInfoStatusNEqFilter", condition = "STATUS != :status"),
    @Filter(name = "buildInfoStatusInFilter", condition = "STATUS in (:status)"),
    @Filter(name = "buildInfoStatusNInFilter", condition = "STATUS not in (:status)"),
    @Filter(name = "buildInfoDeletedEqFilter", condition = "DELETED = :deleted"),
    @Filter(name = "buildInfoDeletedNEqFilter", condition = "DELETED != :deleted"),
    @Filter(name = "buildInfoCustomerIdEqFilter", condition = "CUSTOMER_ID = :customerId"),
    @Filter(name = "buildInfoCustomerIdNEqFilter", condition = "CUSTOMER_ID != :customerId"),
    @Filter(name = "buildInfoCustomerIdInFilter", condition = "CUSTOMER_ID in (:customerId)"),
    @Filter(name = "buildInfoCustomerIdNInFilter", condition = "CUSTOMER_ID not in (:customerId)"),
    @Filter(name = "buildInfoCreatedTimeEqFilter", condition = "CREATED_TIME = :createdTime"),
    @Filter(name = "buildInfoCreatedTimeNEqFilter", condition = "CREATED_TIME != :createdTime"),
    @Filter(name = "buildInfoCreatedTimeInFilter", condition = "CREATED_TIME in (:createdTime)"),
    @Filter(name = "buildInfoCreatedTimeNInFilter", condition = "CREATED_TIME not in (:createdTime)"),
    @Filter(name = "buildInfoModifiedTimeEqFilter", condition = "MODIFIED_TIME = :modifiedTime"),
    @Filter(name = "buildInfoModifiedTimeNEqFilter", condition = "MODIFIED_TIME != :modifiedTime"),
    @Filter(name = "buildInfoModifiedTimeInFilter", condition = "MODIFIED_TIME in (:modifiedTime)"),
    @Filter(name = "buildInfoModifiedTimeNInFilter", condition = "MODIFIED_TIME not in (:modifiedTime)"),
    @Filter(name = "buildInfoCreatorEqFilter", condition = "CREATOR = :creator"),
    @Filter(name = "buildInfoCreatorNEqFilter", condition = "CREATOR != :creator"),
    @Filter(name = "buildInfoCreatorInFilter", condition = "CREATOR in (:creator)"),
    @Filter(name = "buildInfoCreatorNInFilter", condition = "CREATOR not in (:creator)"),
    @Filter(name = "buildInfoLastModifierEqFilter", condition = "LAST_MODIFIER = :lastModifier"),
    @Filter(name = "buildInfoLastModifierNEqFilter", condition = "LAST_MODIFIER != :lastModifier"),
    @Filter(name = "buildInfoLastModifierInFilter", condition = "LAST_MODIFIER in (:lastModifier)"),
    @Filter(name = "buildInfoLastModifierNInFilter", condition = "LAST_MODIFIER not in (:lastModifier)")
})
@FilterDefs({
    @FilterDef(name = "buildInfoBuildNumberEqFilter", parameters = @ParamDef(name = "buildNumber", type = Integer.class)),
    @FilterDef(name = "buildInfoBuildNumberNEqFilter", parameters = @ParamDef(name = "buildNumber", type = Integer.class)),
    @FilterDef(name = "buildInfoBuildNumberInFilter", parameters = @ParamDef(name = "buildNumber", type = Integer.class)),
    @FilterDef(name = "buildInfoBuildNumberNInFilter", parameters = @ParamDef(name = "buildNumber", type = Integer.class)),
    @FilterDef(name = "buildInfoAppIdEqFilter", parameters = @ParamDef(name = "appId", type = Integer.class)),
    @FilterDef(name = "buildInfoAppIdNEqFilter", parameters = @ParamDef(name = "appId", type = Integer.class)),
    @FilterDef(name = "buildInfoAppIdInFilter", parameters = @ParamDef(name = "appId", type = Integer.class)),
    @FilterDef(name = "buildInfoAppIdNInFilter", parameters = @ParamDef(name = "appId", type = Integer.class)),
    @FilterDef(name = "buildInfoStatusEqFilter", parameters = @ParamDef(name = "status", type = String.class)),
    @FilterDef(name = "buildInfoStatusNEqFilter", parameters = @ParamDef(name = "status", type = String.class)),
    @FilterDef(name = "buildInfoStatusInFilter", parameters = @ParamDef(name = "status", type = String.class)),
    @FilterDef(name = "buildInfoStatusNInFilter", parameters = @ParamDef(name = "status", type = String.class)),
    @FilterDef(name = "buildInfoDeletedEqFilter", parameters = @ParamDef(name = "deleted", type = Boolean.class)),
    @FilterDef(name = "buildInfoDeletedNEqFilter", parameters = @ParamDef(name = "deleted", type = Boolean.class)),
    @FilterDef(name = "buildInfoCustomerIdEqFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "buildInfoCustomerIdNEqFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "buildInfoCustomerIdInFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "buildInfoCustomerIdNInFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "buildInfoCreatedTimeEqFilter", parameters = @ParamDef(name = "createdTime", type = Date.class)),
    @FilterDef(name = "buildInfoCreatedTimeNEqFilter", parameters = @ParamDef(name = "createdTime", type = Date.class)),
    @FilterDef(name = "buildInfoCreatedTimeInFilter", parameters = @ParamDef(name = "createdTime", type = Date.class)),
    @FilterDef(name = "buildInfoCreatedTimeNInFilter", parameters = @ParamDef(name = "createdTime", type = Date.class)),
    @FilterDef(name = "buildInfoModifiedTimeEqFilter", parameters = @ParamDef(name = "modifiedTime", type = Date.class)),
    @FilterDef(name = "buildInfoModifiedTimeNEqFilter", parameters = @ParamDef(name = "modifiedTime", type = Date.class)),
    @FilterDef(name = "buildInfoModifiedTimeInFilter", parameters = @ParamDef(name = "modifiedTime", type = Date.class)),
    @FilterDef(name = "buildInfoModifiedTimeNInFilter", parameters = @ParamDef(name = "modifiedTime", type = Date.class)),
    @FilterDef(name = "buildInfoCreatorEqFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "buildInfoCreatorNEqFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "buildInfoCreatorInFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "buildInfoCreatorNInFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "buildInfoLastModifierEqFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "buildInfoLastModifierNEqFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "buildInfoLastModifierInFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "buildInfoLastModifierNInFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class))
}) 
public class BuildInfo  extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BUILD_NUMBER")
    private int buildNumber;

    @Basic
    @Column(name = "STATUS", columnDefinition = "enum('PENDING','COMPLETED','FAILED') default 'PENDING'")
    private String status ;

    @Column(name = "LOG_INFO")
    private String logInfo;

    @Column(name = "CUSTOMER_ID")
    private Integer customerId;

    @NotNull
    @Column(name = "DELETED",nullable = false, columnDefinition = "TINYINT(1)")
    private boolean deleted;
   
    @ManyToOne
    @JoinColumn(name = "APP_ID", referencedColumnName = "ID", nullable = false)
    private MiniappDetails miniAppDetails; 
    
     @OneToOne(mappedBy = "buildInfo")
     private BuildLogInfo buildLogInfo;

    // @Override
    // public int hashCode() {
    //     final int prime = 31;
    //     int result = 1;
    //     result = prime * result + buildNumber;
    //     result = prime * result + ((status == null) ? 0 : status.hashCode());
    //     result = prime * result + ((logInfo == null) ? 0 : logInfo.hashCode());
    //     result = prime * result + ((customerId == null) ? 0 : customerId.hashCode());
    //     result = prime * result + (deleted ? 1231 : 1237);
    //     result = prime * result + ((miniAppDetails == null) ? 0 : miniAppDetails.hashCode());
    //     result = prime * result + ((buildLogInfo == null) ? 0 : buildLogInfo.hashCode());
    //     return result;
    // }

    // @Override
    // public boolean equals(Object obj) {
    //     if (this == obj)
    //         return true;
    //     if (obj == null)
    //         return false;
    //     if (getClass() != obj.getClass())
    //         return false;
    //     BuildInfo other = (BuildInfo) obj;
    //     if (buildNumber != other.buildNumber)
    //         return false;
    //     if (status == null) {
    //         if (other.status != null)
    //             return false;
    //     } else if (!status.equals(other.status))
    //         return false;
    //     if (logInfo == null) {
    //         if (other.logInfo != null)
    //             return false;
    //     } else if (!logInfo.equals(other.logInfo))
    //         return false;
    //     if (customerId == null) {
    //         if (other.customerId != null)
    //             return false;
    //     } else if (!customerId.equals(other.customerId))
    //         return false;
    //     if (deleted != other.deleted)
    //         return false;
    //     if (miniAppDetails == null) {
    //         if (other.miniAppDetails != null)
    //             return false;
    //     } else if (!miniAppDetails.equals(other.miniAppDetails))
    //         return false;
    //     if (buildLogInfo == null) {
    //         if (other.buildLogInfo != null)
    //             return false;
    //     } else if (!buildLogInfo.equals(other.buildLogInfo))
    //         return false;
    //     return true;
    // }

    // @Override
    // public String toString() {
    //     return "BuildInfo [buildNumber=" + buildNumber + ", status=" + status + ", logInfo=" + logInfo + ", customerId="
    //             + customerId + ", deleted=" + deleted + ", miniAppDetails=" + miniAppDetails + ", buildLogInfo="
    //             + buildLogInfo + "]";
    // }

   
}
