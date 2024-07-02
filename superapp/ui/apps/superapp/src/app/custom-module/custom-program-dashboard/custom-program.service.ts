import { Injectable } from '@angular/core';
import { AppContextService, HasValuePipe, HttpService } from '@enttribe/core';


@Injectable({
  providedIn: 'root'
})
export class CustomProgramService {
  urlConst = {
    MODE_WISE_DATA:'Chargers/getModewiseData',
    PROFIT_CHARGING_CAPACITY :'Facility/getProfitChargerCapacity',
    PROFIT_CONNECTION_STANDARD:'Facility/getConnectionStandard',
    GEOGRAPHY_DATA:'Facility/getProfitOfGeographyL2',
    PLANNING_DATA :'Facility/getPlanningState',
    CHARGING_CLASSIFICATION:'Facility/getCountOfStationClassification',
    PROJECT_CARD_API: 'ProjectDashboard/ProjectStatusCount?appName=$appName',
    MONTHLY_TREND_API:'ProjectDashboard/ProjectCompletionCount?appName=$appName',
    INSIGHTS_CARD_API:'ProgramHistory/v1/search?search=id=ge=0; scope.program.appName==$appName&llimit=0&ulimit=5&orderBy=createdTime&orderType=desc'
  }
  APP_CONTEXT=this.appContextService.getContext('Superapp');
  WORKORDER_CONTEXT = this.appContextService.getContext('ENTITY_WORKORDER');
  constructor( private appContextService: AppContextService,
    private apiService : HttpService,
    private hasValue: HasValuePipe) { }
    
    
    
    
    
    getModeWiseData(l2Id:any, l3Id:any){
      let url =  this.APP_CONTEXT+ this.urlConst.MODE_WISE_DATA;
      if (this.hasValue.transform(l2Id)) {
        url = url + "?geoL2Id=" + l2Id;
      }
      if (this.hasValue.transform(l3Id)) {
        url = url + "&geoL3Id=" + l3Id;
      }
      return this.apiService.sendGETRequest(url);
    }
    getChargingCapacity(l2Id:any, l3Id:any){
      let url =  this.APP_CONTEXT+ this.urlConst.PROFIT_CHARGING_CAPACITY;
      if (this.hasValue.transform(l2Id)) {
        url = url + "?geoL2Id=" + l2Id;
      }
      if (this.hasValue.transform(l3Id)) {
        url = url + "&geoL3Id=" + l3Id;
      }
      return this.apiService.sendGETRequest(url);
    }
    getTopConnectionStandard(l2Id:any, l3Id:any){
      let url =  this.APP_CONTEXT+ this.urlConst.PROFIT_CONNECTION_STANDARD;
      if (this.hasValue.transform(l2Id)) {
        url = url + "?geoL2Id=" + l2Id;
      }
      if (this.hasValue.transform(l3Id)) {
        url = url + "&geoL3Id=" + l3Id;
      }
      return this.apiService.sendGETRequest(url);
    }
    getGeographyData(){
      let url =  this.APP_CONTEXT+ this.urlConst.GEOGRAPHY_DATA;
      return this.apiService.sendGETRequest(url);
    }
    getPlanningStateData(l2Id:any, l3Id:any){
      let url =  this.APP_CONTEXT+ this.urlConst.PLANNING_DATA;
      if (this.hasValue.transform(l2Id)) {
        url = url + "?geoL2Id=" + l2Id;
      }
      if (this.hasValue.transform(l3Id)) {
        url = url + "&geoL3Id=" + l3Id;
      }
      return this.apiService.sendGETRequest(url);
    }
    getChargingClassification(){
      let url =  this.APP_CONTEXT+ this.urlConst.CHARGING_CLASSIFICATION;
      return this.apiService.sendGETRequest(url);
    }

    getprojectCard(appName:any, l2Id:any, l3Id:any, entityType:any, programId:any){
      let url =  this.WORKORDER_CONTEXT+ this.urlConst.PROJECT_CARD_API.replace('$appName', appName);

      if (this.hasValue.transform(l2Id)) {
        url = url + "&geoL2=" + l2Id;
      }
      if (this.hasValue.transform(l3Id)) {
        url = url + "&geoL3=" + l3Id;
      }
      if (this.hasValue.transform(entityType)) {
        url = url + "&entityType=" + entityType;
      }
      if (this.hasValue.transform(programId)) {
        url = url + "&programId=" + programId;
      }
      return this.apiService.sendGETRequest(url);
    }

    getMonthlyTrend(appName:any, l2Id:any, l3Id:any, entityType:any, programId:any){
      let url =  this.WORKORDER_CONTEXT+ this.urlConst.MONTHLY_TREND_API.replace('$appName', appName);

      if (this.hasValue.transform(l2Id)) {
        url = url + "&geoL2Id=" + l2Id;
      }
      if (this.hasValue.transform(l3Id)) {
        url = url + "&geoL3Id=" + l3Id;
      }
      if (this.hasValue.transform(entityType)) {
        url = url + "&entityType=" + entityType;
      }
      if (this.hasValue.transform(programId)) {
        url = url + "&programId=" + programId;
      }

      return this.apiService.sendGETRequest(url);
    }
    getInsightscard(appName:any, l2Id:any, l3Id:any, entityType:any, programId:any){
      const url =  this.WORKORDER_CONTEXT+ this.urlConst.INSIGHTS_CARD_API.replace('$appName', appName);
      return this.apiService.sendGETRequest(url);
    }




}


