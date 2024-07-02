package com.enttribe.superapp.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.Filter; 
import org.hibernate.annotations.Filters;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.ParamDef;
import org.hibernate.envers.Audited;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

// @Audited
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity 
@Getter 
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "UserSpace")
@Filters({
    @Filter(name = "userSpaceIdEqFilter", condition = "userspaceid_pk = :userspaceId"),
    @Filter(name = "userSpaceIdNEqFilter", condition = "userspaceid_pk <> :userspaceId"),
    @Filter(name = "userSpaceIdInFilter", condition = "userspaceid_pk in (:userspaceIds)"),
    @Filter(name = "userSpaceIdNInFilter", condition = "userspaceid_pk not in (:userspaceIds)"),
    @Filter(name = "userSpaceNameEqFilter", condition = "name = :name"),
    @Filter(name = "userSpaceNameNEqFilter", condition = "name <> :name"),
    @Filter(name = "userSpaceNameInFilter", condition = "name in (:names)"),
    @Filter(name = "userSpaceNameNInFilter", condition = "name not in (:names)"),
    @Filter(name = "userSpaceGeoTypeEqFilter", condition = "geotype = :geotype"),
    @Filter(name = "userSpaceGeoTypeNEqFilter", condition = "geotype <> :geotype"),
    @Filter(name = "userSpaceGeoTypeInFilter", condition = "geotype in (:geotypes)"),
    @Filter(name = "userSpaceGeoTypeNInFilter", condition = "geotype not in (:geotypes)"),
    @Filter(name = "userSpaceCreationTimeEqFilter", condition = "creationtime = :creationtime"),
    @Filter(name = "userSpaceCreationTimeNEqFilter", condition = "creationtime <> :creationtime"),
    @Filter(name = "userSpaceCreationTimeInFilter", condition = "creationtime in (:creationtimes)"),
    @Filter(name = "userSpaceCreationTimeNInFilter", condition = "creationtime not in (:creationtimes)"),
    @Filter(name = "userSpaceCreatorEqFilter", condition = "creator = :creator"),
    @Filter(name = "userSpaceCreatorNEqFilter", condition = "creator <> :creator"),
    @Filter(name = "userSpaceCreatorInFilter", condition = "creator in (:creators)"),
    @Filter(name = "userSpaceCreatorNInFilter", condition = "creator not in (:creators)")
})  
@FilterDefs({
    @FilterDef(name = "userSpaceIdEqFilter", parameters = @ParamDef(name = "userspaceId", type = Integer.class)),
    @FilterDef(name = "userSpaceIdNEqFilter", parameters = @ParamDef(name = "userspaceId", type = Integer.class)),
    @FilterDef(name = "userSpaceIdInFilter", parameters = @ParamDef(name = "userspaceIds", type = Integer.class)),
    @FilterDef(name = "userSpaceIdNInFilter", parameters = @ParamDef(name = "userspaceIds", type = Integer.class)),
    @FilterDef(name = "userSpaceNameEqFilter", parameters = @ParamDef(name = "name", type = String.class)),
    @FilterDef(name = "userSpaceNameNEqFilter", parameters = @ParamDef(name = "name", type = String.class)),
    @FilterDef(name = "userSpaceNameInFilter", parameters = @ParamDef(name = "names", type = String.class)),
    @FilterDef(name = "userSpaceNameNInFilter", parameters = @ParamDef(name = "names", type = String.class)),
    @FilterDef(name = "userSpaceGeoTypeEqFilter", parameters = @ParamDef(name = "geotype", type = String.class)),
    @FilterDef(name = "userSpaceGeoTypeNEqFilter", parameters = @ParamDef(name = "geotype", type = String.class)),
    @FilterDef(name = "userSpaceGeoTypeInFilter", parameters = @ParamDef(name = "geotypes", type = String.class)),
    @FilterDef(name = "userSpaceGeoTypeNInFilter", parameters = @ParamDef(name = "geotypes", type = String.class)),
    @FilterDef(name = "userSpaceCreatorEqFilter", parameters = @ParamDef(name = "creator", type = String.class)),
    @FilterDef(name = "userSpaceCreatorNEqFilter", parameters = @ParamDef(name = "creator", type = String.class)),
    @FilterDef(name = "userSpaceCreatorInFilter", parameters = @ParamDef(name = "creators", type = String.class)),
    @FilterDef(name = "userSpaceCreatorNInFilter", parameters = @ParamDef(name = "creators", type = String.class))
})  
public class UserSpace { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userspaceid_pk")
    private Integer userSpaceId;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", unique = true)
    private String name;

    @Size(max = 50)
    @Column(name = "geotype")
    private String geoType;

    @Column(name = "creationtime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date creationTime;

    @Size(max = 50)
    @Column(name = "creator")
    private String creator; 

    // Getters and Setters
}
