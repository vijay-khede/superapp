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
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity 
@Setter
@Getter 
@NoArgsConstructor 
@AllArgsConstructor
@Table(name = "MINIAPP_PERMISSIONS")
@Filters({
    @Filter(name = "idEqFilter", condition = "ID = :id"),
    @Filter(name = "idNEqFilter", condition = "ID <> :id"),
    @Filter(name = "idInFilter", condition = "ID in (:ids)"),
    @Filter(name = "idNInFilter", condition = "ID not in (:ids)"),
    @Filter(name = "nameEqFilter", condition = "NAME = :name"),
    @Filter(name = "nameNEqFilter", condition = "NAME <> :name"),
    @Filter(name = "nameInFilter", condition = "NAME in (:names)"),
    @Filter(name = "nameNInFilter", condition = "NAME not in (:names)"),
    @Filter(name = "descriptionEqFilter", condition = "DESCRIPTION = :description"),
    @Filter(name = "descriptionNEqFilter", condition = "DESCRIPTION <> :description"),
    @Filter(name = "descriptionInFilter", condition = "DESCRIPTION in (:descriptions)"),
    @Filter(name = "descriptionNInFilter", condition = "DESCRIPTION not in (:descriptions)"),
    @Filter(name = "deletedEqFilter", condition = "DELETED = :deleted"),
    @Filter(name = "deletedNEqFilter", condition = "DELETED <> :deleted"),
    @Filter(name = "deletedInFilter", condition = "DELETED in (:deleteds)"),
    @Filter(name = "deletedNInFilter", condition = "DELETED not in (:deleteds)"),
    @Filter(name = "customerIdEqFilter", condition = "CUSTOMER_ID = :customerId"),
    @Filter(name = "customerIdNEqFilter", condition = "CUSTOMER_ID <> :customerId"),
    @Filter(name = "customerIdInFilter", condition = "CUSTOMER_ID in (:customerIds)"),
    @Filter(name = "customerIdNInFilter", condition = "CUSTOMER_ID not in (:customerIds)"),
    @Filter(name = "createdTimeEqFilter", condition = "CREATED_TIME = :createdTime"),
    @Filter(name = "createdTimeNEqFilter", condition = "CREATED_TIME <> :createdTime"),
    @Filter(name = "createdTimeInFilter", condition = "CREATED_TIME in (:createdTimes)"),
    @Filter(name = "createdTimeNInFilter", condition = "CREATED_TIME not in (:createdTimes)"),
    @Filter(name = "modifiedTimeEqFilter", condition = "MODIFIED_TIME = :modifiedTime"),
    @Filter(name = "modifiedTimeNEqFilter", condition = "MODIFIED_TIME <> :modifiedTime"),
    @Filter(name = "modifiedTimeInFilter", condition = "MODIFIED_TIME in (:modifiedTimes)"),
    @Filter(name = "modifiedTimeNInFilter", condition = "MODIFIED_TIME not in (:modifiedTimes)"),
    @Filter(name = "creatorEqFilter", condition = "CREATOR = :creator"),
    @Filter(name = "creatorNEqFilter", condition = "CREATOR <> :creator"),
    @Filter(name = "creatorInFilter", condition = "CREATOR in (:creators)"),
    @Filter(name = "creatorNInFilter", condition = "CREATOR not in (:creators)"),
    @Filter(name = "lastModifierEqFilter", condition = "LAST_MODIFIER = :lastModifier"),
    @Filter(name = "lastModifierNEqFilter", condition = "LAST_MODIFIER <> :lastModifier"),
    @Filter(name = "lastModifierInFilter", condition = "LAST_MODIFIER in (:lastModifiers)"),
    @Filter(name = "lastModifierNInFilter", condition = "LAST_MODIFIER not in (:lastModifiers)")
})
@FilterDefs({
    @FilterDef(name = "idEqFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "idNEqFilter", parameters = @ParamDef(name = "id", type = Integer.class)),
    @FilterDef(name = "idInFilter", parameters = @ParamDef(name = "ids", type = Integer.class)),
    @FilterDef(name = "idNInFilter", parameters = @ParamDef(name = "ids", type = Integer.class)),
    @FilterDef(name = "nameEqFilter", parameters = @ParamDef(name = "name", type = String.class)),
    @FilterDef(name = "nameNEqFilter", parameters = @ParamDef(name = "name", type = String.class)),
    @FilterDef(name = "nameInFilter", parameters = @ParamDef(name = "names", type = String.class)),
    @FilterDef(name = "nameNInFilter", parameters = @ParamDef(name = "names", type = String.class)),
    @FilterDef(name = "descriptionEqFilter", parameters = @ParamDef(name = "description", type = String.class)),
    @FilterDef(name = "descriptionNEqFilter", parameters = @ParamDef(name = "description", type = String.class)),
    @FilterDef(name = "descriptionInFilter", parameters = @ParamDef(name = "descriptions", type = String.class)),
    @FilterDef(name = "descriptionNInFilter", parameters = @ParamDef(name = "descriptions", type = String.class)),
    @FilterDef(name = "deletedEqFilter", parameters = @ParamDef(name = "deleted", type = Boolean.class)),
    @FilterDef(name = "deletedNEqFilter", parameters = @ParamDef(name = "deleted", type = Boolean.class)),
    @FilterDef(name = "deletedInFilter", parameters = @ParamDef(name = "deleteds", type = Boolean.class)),
    @FilterDef(name = "deletedNInFilter", parameters = @ParamDef(name = "deleteds", type = Boolean.class)),
    @FilterDef(name = "customerIdEqFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "customerIdNEqFilter", parameters = @ParamDef(name = "customerId", type = Integer.class)),
    @FilterDef(name = "customerIdInFilter", parameters = @ParamDef(name = "customerIds", type = Integer.class)),
    @FilterDef(name = "customerIdNInFilter", parameters = @ParamDef(name = "customerIds", type = Integer.class)),
    @FilterDef(name = "creatorEqFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "creatorNEqFilter", parameters = @ParamDef(name = "creator", type = Integer.class)),
    @FilterDef(name = "creatorInFilter", parameters = @ParamDef(name = "creators", type = Integer.class)),
    @FilterDef(name = "creatorNInFilter", parameters = @ParamDef(name = "creators", type = Integer.class)),
    @FilterDef(name = "lastModifierEqFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "lastModifierNEqFilter", parameters = @ParamDef(name = "lastModifier", type = Integer.class)),
    @FilterDef(name = "lastModifierInFilter", parameters = @ParamDef(name = "lastModifiers", type = Integer.class)),
    @FilterDef(name = "lastModifierNInFilter", parameters = @ParamDef(name = "lastModifiers", type = Integer.class))
})
public class MiniAppPermissions extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @NotNull
    @Size(max = 50)
    @Column(name = "NAME")
    private String name;

    @Size(max = 255)
    @Column(name = "DESCRIPTION")
    private String description;

    @NotNull
    @Column(name = "DELETED")
    private Boolean deleted = false;

    @Column(name = "CUSTOMER_ID")
    private Integer customerId;  

    @JsonIgnoreProperties({"miniAppPermissions","miniAppDetails"})
    @Basic   
    @ManyToMany(mappedBy = "miniAppPermissions",fetch = FetchType.EAGER)
    private Set<MiniappDetails> miniAppDetails; 
   
}
