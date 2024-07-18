package com.enttribe.superapp.model;
import jakarta.persistence.*;
import java.util.*;

import com.enttribe.core.generic.utils.ApplicationContextProvider;
import com.enttribe.orchestrator.utility.controller.WorkflowActionsController;
import com.enttribe.orchestrator.utility.model.WorkflowActions;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;

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
@Table(name = "MINIAPP_DETAILS")
@Filters(value = { @Filter(name = "miniappDetailsApplicationKeyNInFilter", condition = "APPLICATION_KEY not in (:applicationKey)"), @Filter(name = "miniappDetailsApplicationKeyEqFilter", condition = "APPLICATION_KEY = :applicationKey"), @Filter(name = "miniappDetailsApplicationKeyNEqFilter", condition = "APPLICATION_KEY != :applicationKey"), @Filter(name = "miniappDetailsApplicationKeyInFilter", condition = "APPLICATION_KEY in (:applicationKey)"), @Filter(name = "miniappDetailsCustomerIdGtFilter", condition = "CUSTOMER_ID > :customerId"), @Filter(name = "miniappDetailsCustomerIdNInFilter", condition = "CUSTOMER_ID not in (:customerId)"), @Filter(name = "miniappDetailsCustomerIdLtEqFilter", condition = "CUSTOMER_ID <= :customerId"), @Filter(name = "miniappDetailsCustomerIdLtFilter", condition = "CUSTOMER_ID < :customerId"), @Filter(name = "miniappDetailsCustomerIdEqFilter", condition = "CUSTOMER_ID = :customerId"), @Filter(name = "miniappDetailsCustomerIdNEqFilter", condition = "CUSTOMER_ID != :customerId"), @Filter(name = "miniappDetailsCustomerIdInFilter", condition = "CUSTOMER_ID in (:customerId)"), @Filter(name = "miniappDetailsCustomerIdBwFilter", condition = "CUSTOMER_ID > :customerId_MIN  AND CUSTOMER_ID < :customerId_MAX"), @Filter(name = "miniappDetailsCustomerIdGtEqFilter", condition = "CUSTOMER_ID >= :customerId"), @Filter(name = "miniappDetailsCustomerIdEqFilter", condition = "CUSTOMER_ID = :customerId"), @Filter(name = "miniappDetailsDescriptionNInFilter", condition = "DESCRIPTION not in (:description)"), @Filter(name = "miniappDetailsDescriptionEqFilter", condition = "DESCRIPTION = :description"), @Filter(name = "miniappDetailsDescriptionNEqFilter", condition = "DESCRIPTION != :description"), @Filter(name = "miniappDetailsDescriptionInFilter", condition = "DESCRIPTION in (:description)"), @Filter(name = "miniappDetailsIconUrlNInFilter", condition = "ICON_URL not in (:iconUrl)"), @Filter(name = "miniappDetailsIconUrlEqFilter", condition = "ICON_URL = :iconUrl"), @Filter(name = "miniappDetailsIconUrlNEqFilter", condition = "ICON_URL != :iconUrl"), @Filter(name = "miniappDetailsIconUrlInFilter", condition = "ICON_URL in (:iconUrl)"), @Filter(name = "miniappDetailsIdGtFilter", condition = "ID > :id"), @Filter(name = "miniappDetailsIdNInFilter", condition = "ID not in (:id)"), @Filter(name = "miniappDetailsIdLtEqFilter", condition = "ID <= :id"), @Filter(name = "miniappDetailsIdLtFilter", condition = "ID < :id"), @Filter(name = "miniappDetailsIdEqFilter", condition = "ID = :id"), @Filter(name = "miniappDetailsIdNEqFilter", condition = "ID != :id"), @Filter(name = "miniappDetailsIdInFilter", condition = "ID in (:id)"), @Filter(name = "miniappDetailsIdBwFilter", condition = "ID > :id_MIN  AND ID < :id_MAX"), @Filter(name = "miniappDetailsIdGtEqFilter", condition = "ID >= :id"), @Filter(name = "miniappDetailsIdEqFilter", condition = "ID = :id"), @Filter(name = "miniappDetailsNameNInFilter", condition = "NAME not in (:name)"), @Filter(name = "miniappDetailsNameEqFilter", condition = "NAME = :name"), @Filter(name = "miniappDetailsNameNEqFilter", condition = "NAME != :name"), @Filter(name = "miniappDetailsNameInFilter", condition = "NAME in (:name)"), @Filter(name = "miniappDetailsTaggingNInFilter", condition = "TAGGING not in (:tagging)"), @Filter(name = "miniappDetailsTaggingEqFilter", condition = "TAGGING = :tagging"), @Filter(name = "miniappDetailsTaggingNEqFilter", condition = "TAGGING != :tagging"), @Filter(name = "miniappDetailsTaggingInFilter", condition = "TAGGING in (:tagging)"), @Filter(name = "miniappDetailsVersionNInFilter", condition = "VERSION not in (:version)"), @Filter(name = "miniappDetailsVersionEqFilter", condition = "VERSION = :version"), @Filter(name = "miniappDetailsVersionNEqFilter", condition = "VERSION != :version"), @Filter(name = "miniappDetailsVersionInFilter", condition = "VERSION in (:version)") })
@FilterDefs(value = { @FilterDef(name = "miniappDetailsApplicationKeyNInFilter", parameters = { @ParamDef(name = "applicationKey", type = String.class) }), @FilterDef(name = "miniappDetailsApplicationKeyEqFilter", parameters = { @ParamDef(name = "applicationKey", type = String.class) }), @FilterDef(name = "miniappDetailsApplicationKeyNEqFilter", parameters = { @ParamDef(name = "applicationKey", type = String.class) }), @FilterDef(name = "miniappDetailsApplicationKeyInFilter", parameters = { @ParamDef(name = "applicationKey", type = String.class) }), @FilterDef(name = "miniappDetailsCustomerIdGtFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappDetailsCustomerIdNInFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappDetailsCustomerIdLtEqFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappDetailsCustomerIdLtFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappDetailsCustomerIdEqFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappDetailsCustomerIdNEqFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappDetailsCustomerIdInFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappDetailsCustomerIdBwFilter", parameters = { @ParamDef(name = "customerId_MIN", type = Integer.class), @ParamDef(name = "customerId_MAX", type = Integer.class) }), @FilterDef(name = "miniappDetailsCustomerIdGtEqFilter", parameters = { @ParamDef(name = "customerId", type = Integer.class) }), @FilterDef(name = "miniappDetailsDescriptionNInFilter", parameters = { @ParamDef(name = "description", type = String.class) }), @FilterDef(name = "miniappDetailsDescriptionEqFilter", parameters = { @ParamDef(name = "description", type = String.class) }), @FilterDef(name = "miniappDetailsDescriptionNEqFilter", parameters = { @ParamDef(name = "description", type = String.class) }), @FilterDef(name = "miniappDetailsDescriptionInFilter", parameters = { @ParamDef(name = "description", type = String.class) }), @FilterDef(name = "miniappDetailsIconUrlNInFilter", parameters = { @ParamDef(name = "iconUrl", type = String.class) }), @FilterDef(name = "miniappDetailsIconUrlEqFilter", parameters = { @ParamDef(name = "iconUrl", type = String.class) }), @FilterDef(name = "miniappDetailsIconUrlNEqFilter", parameters = { @ParamDef(name = "iconUrl", type = String.class) }), @FilterDef(name = "miniappDetailsIconUrlInFilter", parameters = { @ParamDef(name = "iconUrl", type = String.class) }), @FilterDef(name = "miniappDetailsIdGtFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappDetailsIdNInFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappDetailsIdLtEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappDetailsIdLtFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappDetailsIdEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappDetailsIdNEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappDetailsIdInFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), @FilterDef(name = "miniappDetailsIdBwFilter", parameters = { @ParamDef(name = "id_MIN", type = Integer.class), @ParamDef(name = "id_MAX", type = Integer.class) }), @FilterDef(name = "miniappDetailsIdGtEqFilter", parameters = { @ParamDef(name = "id", type = Integer.class) }), 

@FilterDef(name = "miniappDetailsNameNInFilter", parameters = { @ParamDef(name = "name", type = String.class) }), @FilterDef(name = "miniappDetailsNameEqFilter", parameters = { @ParamDef(name = "name", type = String.class) }), @FilterDef(name = "miniappDetailsNameNEqFilter", parameters = { @ParamDef(name = "name", type = String.class) }), @FilterDef(name = "miniappDetailsNameInFilter", parameters = { @ParamDef(name = "name", type = String.class) }), @FilterDef(name = "miniappDetailsTaggingNInFilter", parameters = { @ParamDef(name = "tagging", type = String.class) }), @FilterDef(name = "miniappDetailsTaggingEqFilter", parameters = { @ParamDef(name = "tagging", type = String.class) }), @FilterDef(name = "miniappDetailsTaggingNEqFilter", parameters = { @ParamDef(name = "tagging", type = String.class) }), @FilterDef(name = "miniappDetailsTaggingInFilter", parameters = { @ParamDef(name = "tagging", type = String.class) }), @FilterDef(name = "miniappDetailsVersionNInFilter", parameters = { @ParamDef(name = "version", type = String.class) }), @FilterDef(name = "miniappDetailsVersionEqFilter", parameters = { @ParamDef(name = "version", type = String.class) }), @FilterDef(name = "miniappDetailsVersionNEqFilter", parameters = { @ParamDef(name = "version", type = String.class) }), @FilterDef(name = "miniappDetailsVersionInFilter", parameters = { @ParamDef(name = "version", type = String.class) }) })
public class MiniappDetails extends BaseEntity {   

    @Size(max = 100)
    @Basic
    @Column(name = "APPLICATION_KEY", nullable = false, length = 100)
    private String applicationKey;

    @Basic
    @Column(name = "CUSTOMER_ID", columnDefinition = "INT") 
    private Integer customerId;
    
    @Size(max = 30) 
    @Basic 
    @Column(length = 30,name = "STATUS")
    private String status; 

    @Basic
    private boolean deleted;

    @Size(max = 255)
    @Basic
    private String description; 

    @Size(max = 100)
    @Basic  
    @Column(name = "BUSINESS_FIELD",length = 100)
    private String busiessField;  
   
    @Size(max = 100)
    @Basic 
    @Column(name = "SERVICE_SCENARIO",length = 100)
    private String serviceScenario;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(targetEntity = com.enttribe.superapp.model.HostingDetails.class, mappedBy = "miniappDetails", cascade = CascadeType.MERGE)
    private Set<HostingDetails> hostingDetails = new HashSet<HostingDetails>();

    @Size(max = 255)
    @Basic
    @Column(name = "ICON_URL") 
    private String iconUrl;    

    @Basic
    @Column(name = "PERMISSIONS")
    private String permissions;


    @Basic
    @Column(name = "ORG_ROLE")
    private String orgRole;

    // @Basic  
    // @Column(name = "ORG_ROLES")
    // private String orgRoles;
    
    @Size(max = 255) 
    @Basic
    @Column(name = "ICON_PATH", length = 255)
    private String iconPath;

    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Id
    @Column(columnDefinition = "INT")
    private Integer id;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) 
    @OneToMany(targetEntity = com.enttribe.superapp.model.MiniappBuildDetails.class, mappedBy = "miniappDetails", cascade = CascadeType.MERGE)
    private Set<MiniappBuildDetails> miniappBuildDetails = new HashSet<MiniappBuildDetails>();
    
    @NotEmpty
    @Size(max = 50)
    @Basic
    @Column(nullable = false, length = 50)
    private String name;
    
    @Size(max = 30)
    @Basic
    @Column(length = 30)
    private String tagging;
   
    @Size(max = 15)
    @Basic
    @Column(length = 15)
    private String version; 
    
    // @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    @JsonIgnoreProperties({"miniAppDetails"})
        @ManyToMany(fetch = FetchType.EAGER)
           @JoinTable(name = "MINIAPP_PERMISSIONS_REFERENCE",joinColumns = {
                @JoinColumn(name = "APP_ID" ,referencedColumnName = "id")
            }, 
            inverseJoinColumns = {
                @JoinColumn(name = "PERMISSION_ID" ,referencedColumnName = "id")
            })
            private Set<MiniAppPermissions> miniAppPermissions = new HashSet<>();   
 
            // @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
            @JsonIgnoreProperties({"miniappDetails"})
            @ManyToMany(fetch = FetchType.EAGER)
               @JoinTable(name = "MINI_APP_USER_ROLE_REF",joinColumns = {
                    @JoinColumn(name = "APP_ID" ,referencedColumnName = "id")
                },
                inverseJoinColumns = {
                    @JoinColumn(name = "ORGA_ID" ,referencedColumnName = "organisationroleid_pk")
                }) 

                private Set<OrganisationRole> organisationRoles = new HashSet<>();

                @Basic
                @Column(name = "WORKFLOW_STAGE", columnDefinition = "VARCHAR(100)")
                private String workflowStage;

                @Column(name = "PROCESS_INSTANCE_ID")
                private String processInstanceId;   

                public List<WorkflowActions> getActions() {  
                return ApplicationContextProvider.getApplicationContext()
                .getBean(WorkflowActionsController.class)
                .getWorkflowActions(id, "MiniappDetails"); 
               }

}
