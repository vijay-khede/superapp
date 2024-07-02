import { Injectable } from '@angular/core';
import { AppContextService, HasValuePipe, HttpService } from '@enttribe/core';


@Injectable({
  providedIn: 'root'
})


export class MaintenanceDashboardService {


  urlConst = {
    STATE_LIST:'PrimaryGeoL2/findWithPaginationAndOrder/v1?_s=(id=ge=0)&orderBy=modificationTime&orderType=desc&ulimit=399&llimit=0',
    CITY_LIST:'PrimaryGeoL3/findWithPaginationAndOrder/v1?_s=(primaryGeoL2.id==$geographyL2ID)&orderBy=modificationTime&orderType=desc&ulimit=399&llimit=0',
    PROJECT_CARD_API : 'ProjectDashboard/v1/ProjectStatusCountMaintenance?appName=$appName',
    SCHEDULE_THIRTY_DAYS: 'ProjectDashboard/v1/getScheduleFrequency?appName=$appName',
    MAINTENANCE_CATEGORY:'ProjectDashboard/v1/getMaintenanceByCategory?appName=$appName',
    ASSIGNED_USERS :'ProjectDashboard/v1/getAssignedUsers?appName=$appName',
    ASSIGNED_VENDOR : 'Project/v1/projectCountByVendors',
    TOP_CARD :'Project/v1/projectCountByCategory'
  }

  APP_CONTEXT='';
  GEOGRAPHY_CONTEXT='';

  constructor(
    private appContextService: AppContextService,
    private apiService : HttpService,
    private hasValue: HasValuePipe,
    ) { 
    this.GEOGRAPHY_CONTEXT = this.appContextService.getContext('PLATFORM');
    this.APP_CONTEXT = this.appContextService.getContext('ENTITY_WORKORDER');
  }

  getStateListByRegionId(){
    const url = this.GEOGRAPHY_CONTEXT + this.urlConst.STATE_LIST;
    return this.apiService.sendGETRequest(url);
  }
  getCityListByRegionId(stateId){
    const url = this.GEOGRAPHY_CONTEXT + this.urlConst.CITY_LIST.replace('$geographyL2ID',stateId);
    return this.apiService.sendGETRequest(url);  
  }


  getCategoryListByApplicationName(appName, l2id, l3id, entityType,json){
    let url = this.APP_CONTEXT + this.urlConst.PROJECT_CARD_API.replace('$appName', appName);

    if(this.hasValue.transform(l2id)){
      url = url + '&geoL2Id=' + l2id
    }
    if(this.hasValue.transform(l3id)){
      url = url + '&geoL3Id=' + l3id
    }
    if(this.hasValue.transform(entityType)){
      url = url + '&entityType=' + entityType
    }

    return this.apiService.sendPOSTRequest(url, json);
  } 
  MaintenanceByCategory(appName, l2id, l3id, entityType,json) {
    let url = this.APP_CONTEXT + this.urlConst.MAINTENANCE_CATEGORY.replace('$appName', appName);
    if(this.hasValue.transform(l2id)){
      url = url + '&geoL2Id=' + l2id
    }

    if(this.hasValue.transform(l3id)){
      url = url + '&geoL3Id=' + l3id
    }

    if(this.hasValue.transform(entityType)){
      url = url + '&entityType=' + entityType
    }
    return this.apiService.sendPOSTRequest(url, json);
  }
  scheduleFrequency30Days(appName, l2id, l3id, entityType,json) {
    let url = this.APP_CONTEXT + this.urlConst.SCHEDULE_THIRTY_DAYS.replace('$appName', appName);
    if(this.hasValue.transform(l2id)){
      url = url + '&geoL2Id=' + l2id
    }

    if(this.hasValue.transform(l3id)){
      url = url + '&geoL3Id=' + l3id
    }

    if(this.hasValue.transform(entityType)){
      url = url + '&entityType=' + entityType
    }
    return this.apiService.sendPOSTRequest(url, json);
  }
  AssignedUsers(appName, l2id, l3id, entityType,json) {
    let url = this.APP_CONTEXT + this.urlConst.ASSIGNED_USERS.replace('$appName', appName);
    if(this.hasValue.transform(l2id)){
      url = url + '&geoL2Id=' + l2id
    }

    if(this.hasValue.transform(l3id)){
      url = url + '&geoL3Id=' + l3id
    }

    if(this.hasValue.transform(entityType)){
      url = url + '&entityType=' + entityType
    }
    return this.apiService.sendPOSTRequest(url, json);
  }
  assginedVendor(appName, l2id, l3id, entityType,categories) {
    const url = this.APP_CONTEXT + this.urlConst.ASSIGNED_VENDOR;
    const json : any = {
      "categories":categories,
      "appName":appName,
      "entityType":entityType,
      "geoL2Id": l2id,
      "geoL3Id":l3id
    }
    return this.apiService.sendPOSTRequest(url, json);
  }
  topCard(appName, l2id, l3id, entityType,categories) {
    const url = this.APP_CONTEXT + this.urlConst.TOP_CARD;
    const json : any = {
      "categories":categories,
      "appName":appName,
      "entityType":entityType,
      "geoL2Id": l2id,
      "geoL3Id":l3id
    }
    return this.apiService.sendPOSTRequest(url, json);
  }
}