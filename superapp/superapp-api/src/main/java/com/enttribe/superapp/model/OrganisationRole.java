package com.enttribe.superapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Filters;
import org.hibernate.annotations.ParamDef;
import org.hibernate.envers.Audited;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;
// @Audited
@Entity 
@Setter
@Getter  
@NoArgsConstructor  
@AllArgsConstructor 
@JsonIgnoreProperties(value = {
    "hibernateLazyInitializer", "handler","miniappDetails"
})
@Table(name = "OrganisationRole")
@Filters({
    @Filter(name = "organisationroleid_pkEqFilter", condition = "organisationroleid_pk = :organisationroleid_pk"),
    @Filter(name = "organisationroleid_pkNEqFilter", condition = "organisationroleid_pk <> :organisationroleid_pk"),
    @Filter(name = "organisationroleid_pkInFilter", condition = "organisationroleid_pk in (:organisationroleid_pks)"),
    @Filter(name = "organisationroleid_pkNInFilter", condition = "organisationroleid_pk not in (:organisationroleid_pks)"),
    @Filter(name = "nameEqqFilter", condition = "name = :name"),
    @Filter(name = "nameNEqqFilter", condition = "name <> :name"),
    @Filter(name = "nameInnFilter", condition = "name in (:names)"),
    @Filter(name = "nameNInFilter", condition = "name not in (:names)"),
    @Filter(name = "orgIdEqFilter", condition = "orgId = :orgId"),
    @Filter(name = "orgIdNEqFilter", condition = "orgId <> :orgId"),
    @Filter(name = "orgIdInFilter", condition = "orgId in (:orgIds)"),
    @Filter(name = "orgIdNInFilter", condition = "orgId not in (:orgIds)"),
    @Filter(name = "descriptionEqFilter", condition = "description = :description"),
    @Filter(name = "descriptionNEqFilter", condition = "description <> :description"),
    @Filter(name = "descriptionInFilter", condition = "description in (:descriptions)"),
    @Filter(name = "descriptionNInFilter", condition = "description not in (:descriptions)"),
    // @Filter(name = "displayNameEqFilter", condition = "displayName = :displayName"),
    @Filter(name = "displayNameNEqFilter", condition = "displayName <> :displayName"),
    @Filter(name = "displayNameInFilter", condition = "displayName in (:displayNames)"),
    @Filter(name = "displayNameNInFilter", condition = "displayName not in (:displayNames)"),
    @Filter(name = "parentroleidEqFilter", condition = "parentroleid = :parentroleid"),
    @Filter(name = "parentroleidNEqFilter", condition = "parentroleid <> :parentroleid"),
    @Filter(name = "parentroleidInFilter", condition = "parentroleid in (:parentroleids)"),
    @Filter(name = "parentroleidNInFilter", condition = "parentroleid not in (:parentroleids)"),
    @Filter(name = "creationtimeEqFilter", condition = "creationtime = :creationtime"),
    @Filter(name = "creationtimeNEqFilter", condition = "creationtime <> :creationtime"),
    @Filter(name = "creationtimeInFilter", condition = "creationtime in (:creationtimes)"),
    @Filter(name = "creationtimeNInFilter", condition = "creationtime not in (:creationtimes)"),
    @Filter(name = "modificationtimeEqFilter", condition = "modificationtime = :modificationtime"),
    @Filter(name = "modificationtimeNEqFilter", condition = "modificationtime <> :modificationtime"),
    @Filter(name = "modificationtimeInFilter", condition = "modificationtime in (:modificationtimes)"),
    @Filter(name = "modificationtimeNInFilter", condition = "modificationtime not in (:modificationtimes)"),
    @Filter(name = "creatorByEqFilter", condition = "creatorBy = :creatorBy"),
    @Filter(name = "creatorByNEqFilter", condition = "creatorBy <> :creatorBy"),
    @Filter(name = "creatorByInFilter", condition = "creatorBy in (:creatorBys)"),
    @Filter(name = "creatorByNInFilter", condition = "creatorBy not in (:creatorBys)"),
    @Filter(name = "modificationByEqFilter", condition = "modificationBy = :modificationBy"),
    @Filter(name = "modificationByNEqFilter", condition = "modificationBy <> :modificationBy"),
    @Filter(name = "modificationByInFilter", condition = "modificationBy in (:modificationBys)"),
    @Filter(name = "modificationByNInFilter", condition = "modificationBy not in (:modificationBys)"),
    @Filter(name = "isActiveEqFilter", condition = "isActive = :isActive"),
    @Filter(name = "isActiveNEqFilter", condition = "isActive <> :isActive"),
    @Filter(name = "isActiveInFilter", condition = "isActive in (:isActives)"),
    @Filter(name = "isActiveNInFilter", condition = "isActive not in (:isActives)"),
    @Filter(name = "userspaceid_fkEqFilter", condition = "userspaceid_fk = :userspaceid_fk"),
    @Filter(name = "userspaceid_fkNEqFilter", condition = "userspaceid_fk <> :userspaceid_fk"),
    @Filter(name = "userspaceid_fkInFilter", condition = "userspaceid_fk in (:userspaceid_fks)"),
    @Filter(name = "userspaceid_fkNInFilter", condition = "userspaceid_fk not in (:userspaceid_fks)"),
    @Filter(name = "customeridEqFilter", condition = "customerid = :customerid"),
    @Filter(name = "customeridNEqFilter", condition = "customerid <> :customerid"),
    @Filter(name = "customeridInFilter", condition = "customerid in (:customerids)"),
    @Filter(name = "customeridNInFilter", condition = "customerid not in (:customerids)")
})
@FilterDefs({
    @FilterDef(name = "organisationroleid_pkEqFilter", parameters = @ParamDef(name = "organisationroleid_pk", type = Integer.class)),
    @FilterDef(name = "organisationroleid_pkNEqFilter", parameters = @ParamDef(name = "organisationroleid_pk", type = Integer.class)),
    @FilterDef(name = "organisationroleid_pkInFilter", parameters = @ParamDef(name = "organisationroleid_pks", type = Integer.class)),
    @FilterDef(name = "organisationroleid_pkNInFilter", parameters = @ParamDef(name = "organisationroleid_pks", type = Integer.class)),
    @FilterDef(name = "nameEqqFilters", parameters = @ParamDef(name = "name", type = String.class)),
    @FilterDef(name = "nameNEqqFilters", parameters = @ParamDef(name = "name", type = String.class)),
    @FilterDef(name = "nameInnFilters", parameters = @ParamDef(name = "names",  type = String.class)),
    @FilterDef(name = "nameNInFilters", parameters = @ParamDef(name = "names", type = String.class)),
    @FilterDef(name = "orgIdEqFilters", parameters = @ParamDef(name = "orgId", type = String.class)),
    @FilterDef(name = "orgIdNEqFilters", parameters = @ParamDef(name = "orgId", type = String.class)),
    @FilterDef(name = "orgIdInFilters", parameters = @ParamDef(name = "orgIds", type = String.class)),
    @FilterDef(name = "orgIdNInFilters", parameters = @ParamDef(name = "orgIds", type = String.class)),
    @FilterDef(name = "descriptionEqFilters", parameters = @ParamDef(name = "description", type = String.class)),
    @FilterDef(name = "descriptionNEqFilters", parameters = @ParamDef(name = "description", type = String.class)),
    @FilterDef(name = "descriptionInFilters", parameters = @ParamDef(name = "descriptions", type = String.class)),
    @FilterDef(name = "descriptionNInFilters", parameters = @ParamDef(name = "descriptions", type = String.class)),
    // @FilterDef(name = "displayNameEqFilter", parameters = @ParamDef(name = "displayName", type = String.class)),
    @FilterDef(name = "displayNameNEqFilters", parameters = @ParamDef(name = "displayName", type = String.class)),
    @FilterDef(name = "displayNameInFilters", parameters = @ParamDef(name = "displayNames", type = String.class)),
    @FilterDef(name = "displayNameNInFilters", parameters = @ParamDef(name = "displayNames", type = String.class)),
    @FilterDef(name = "parentroleidEqFilters", parameters = @ParamDef(name = "parentroleid", type = Integer.class)),
    @FilterDef(name = "parentroleidNEqFilters", parameters = @ParamDef(name = "parentroleid", type = Integer.class)),
    @FilterDef(name = "parentroleidInFilters", parameters = @ParamDef(name = "parentroleids", type = Integer.class)),
    @FilterDef(name = "parentroleidNInFilters", parameters = @ParamDef(name = "parentroleids", type = Integer.class)),
    @FilterDef(name = "creatorByNEqFilters", parameters = @ParamDef(name = "creatorBy", type = String.class)),
    @FilterDef(name = "creatorByInFilters", parameters = @ParamDef(name = "creatorBys", type = String.class)),
    @FilterDef(name = "creatorByNInFilters", parameters = @ParamDef(name = "creatorBys", type = String.class)),
    @FilterDef(name = "modificationByEqFilters", parameters = @ParamDef(name = "modificationBy", type = String.class)),
    @FilterDef(name = "modificationByNEqFilters", parameters = @ParamDef(name = "modificationBy", type = String.class)),
    @FilterDef(name = "modificationByInFilters", parameters = @ParamDef(name = "modificationBys", type = String.class)),
    @FilterDef(name = "modificationByNInFilters", parameters = @ParamDef(name = "modificationBys", type = String.class)),
    @FilterDef(name = "isActiveEqFilters", parameters = @ParamDef(name = "isActive", type = Boolean.class)),
    @FilterDef(name = "isActiveNEqFilters", parameters = @ParamDef(name = "isActive", type = Boolean.class)),
    @FilterDef(name = "isActiveInFilters", parameters = @ParamDef(name = "isActives", type = Boolean.class)),
    @FilterDef(name = "isActiveNInFilters", parameters = @ParamDef(name = "isActives", type = Boolean.class)),
    @FilterDef(name = "userspaceid_fkEqFilters", parameters = @ParamDef(name = "userspaceid_fk", type = Integer.class)),
    @FilterDef(name = "userspaceid_fkNEqFilters", parameters = @ParamDef(name = "userspaceid_fk", type = Integer.class)),
    @FilterDef(name = "userspaceid_fkInFilters", parameters = @ParamDef(name = "userspaceid_fks", type = Integer.class)),
    @FilterDef(name = "userspaceid_fkNInFilters", parameters = @ParamDef(name = "userspaceid_fks", type = Integer.class)),
    @FilterDef(name = "customeridEqFilters", parameters = @ParamDef(name = "customerid", type = Integer.class)),
    @FilterDef(name = "customeridNEqFilters", parameters = @ParamDef(name = "customerid", type = Integer.class)),
    @FilterDef(name = "customeridInFilters", parameters = @ParamDef(name = "customerids", type = Integer.class)),
    @FilterDef(name = "customeridNInFilter", parameters = @ParamDef(name = "customerids", type = Integer.class))
})
public class OrganisationRole {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "organisationroleid_pk")
    private Integer organisationRoleId;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 50)
    @Column(name = "orgId")
    private String orgId;

    @Size(max = 255)
    @Column(name = "description")
    private String description;

    @Size(max = 50)
    @Column(name = "displayName")
    private String displayName;

    @Column(name = "parentroleid")
    private Integer parentRoleId;

    @Column(name = "creationtime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date creationTime;

    @Column(name = "modificationtime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date modificationTime;

    @Size(max = 50)
    @Column(name = "creatorBy")
    private String creatorBy;

    @Size(max = 50)
    @Column(name = "modificationBy")
    private String modificationBy;

    @NotNull
    @Column(name = "isActive", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Boolean isActive;

    @Column(name = "userspaceid_fk")
    private Integer userspaceIdFk;

    @Column(name = "customerid")
    private Integer customerId;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "parentroleid", referencedColumnName = "organisationroleid_pk", insertable = false, updatable = false)
    // private OrganisationRole parentRole;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "userspaceid_fk", referencedColumnName = "userspaceid_pk", insertable = false, updatable = false)
    // private UserSpace userSpace;
    
    @JsonIgnoreProperties({"organisationRoles","miniappDetails"})
    @Basic 
    @ManyToMany(mappedBy = "organisationRoles",fetch = FetchType.LAZY)
    private Set<MiniappDetails> miniappDetails;

 
    

}

