import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreUtilService, HasValuePipe, SystemConfigService } from '@enttribe/core';
import { ChartService } from '@enttribe/core/chart';
import {  TranslatePipe } from '@enttribe/core/tools';
import { BehaviorSubject } from 'rxjs';
import { DashboardPopUpWindowComponent } from '../dashboard-pop-up-window/dashboard-pop-up-window.component';
import { MaintenanceDashboardService } from './maintenance-dashboard.service';
import _ from 'lodash';
import { GenericModalService } from '@enttribe/core/tools/generic-modal';

@Component({
  selector: 'wo-maintenance-dashboard',
  templateUrl: './maintenance-dashboard.component.html',
  styleUrls: ['./maintenance-dashboard.component.scss']
})
export class MaintenanceDashboardComponent implements OnInit {

  public pageActions = [
    { label: "NEW_WINDOW", icon: "New-Window-Outline", action: "newWindow" },
  ];

  pageInfo: any = {
    name: this.translate.transform('MAINTENANCE_DASHBOARD'),
    headerIcon: 'icomoon coverage',
    hideGlobalSearch:true,
    icon: 'icomoon prop',
    navigation: [
      {
        title: this.translate.transform('MAINTENANCE_DASHBOARD'),
        route: '',
      },
    ]
  };


  isDashboardIconVisible =true;
  fromDashboard : any = "WORKORDER_MAINTENANCE_DASHBOARD";
  appName:string='Superapp_APP_NAME';
  basePath='superapp/superapp-custom-module';

  entityType:string;
  isListShow=false;
  title:any;
  agGridName="";
  paramsJson={};
  entityTypeList:any=[];
  selectedEntity=''
  dashboardTitle:any="MAINTENANCE_DASHBOARD";
  workorderListTitle:any="MAINTENANCE_PROJECTS";
  addWorkorderVisible=false;
  entityTypeListVisible=false; 

  stateList: any = [];
  selectedState: any = { "displayName": "All states" };
  cityList: any = ["All cities"];
  selectedCity: any = "All cities";


  addWorkorderListToggelVisible:boolean=true; 
  isAdHocProject:boolean=true;  
  addAdhocWorkorderVisible:boolean=true;
  adhocWorkorderentityTypeList=[{"name":"All","value":"all"},{"name":"Candidate","value":"Candidate"},{"name":"Facility","value":"Facility"}];
  adhocWorkorderHeaderTitle='Timeline';
  isScopeFieldVisible =true;
  adHocWorkorderAgGridName='';

  scheduleFrequencyColumnSubject: any;
  scheduleFrequencyColumnOption: any;

  maintenancePieSubject: any;
  maintenancePieOption: any;

  scheduleFrequencyPieSubject: any;
  scheduleFrequencyPieOption: any;

  correctivePieSubject: any;
  correctivePieOption: any;

  assignedVendorSubject: any;
  assignedVendorOption: any;

  assignedUsersSubject: any;
  assignedUsersoption: any;

  maintenanceCategorySubject: any;
  maintenanceCategoryOption: any;

  allMaintenanceDashboardData: any;

  propertyPiechartData: any;
  maintenancePiechartData: any;
  schedulePiechartData: any;

  mainatenanceCardData:any;
  assignedUsers:any;
  scheduleFrequencyThirtyDays:any;
  MaintenanceByCategoryData:any;
  assignedVendorData:any;
  topCardData:any;

  categoryJson:any; 
  constructor(
    private chartService: ChartService,
    private hasValue: HasValuePipe,
    private systemConfigService: SystemConfigService,
    private genericModalService: GenericModalService,
    private route:ActivatedRoute,
    private router:Router,
    private translate:TranslatePipe,
    private coreUtil:CoreUtilService,
    private maintenanceService: MaintenanceDashboardService
  ) { 
    if(this.appName){
      let json =JSON.parse(this.systemConfigService.getSysConfig ('WORKORDER_APP_MAINTENANCE_CATEGORY_JSON')?.value);   
      if(json && json[this.appName]){
        this.categoryJson=json[this.appName];
      }
    }
    this.route.queryParams.subscribe(data=>{
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.entityType='';
      console.log(data);
      if(data?.pageName){
        this.entityType=data.pageName;
       }
       this.isListShow=data?.isListShow=="true"?true:false;
       if(data?.title){
         this.title=data.title;
         this.spilitTitle();
         if(this.paramsJson && this.paramsJson['gridName']){
          this.agGridName=this.paramsJson['gridName'];
         }
         if(this.paramsJson && this.paramsJson['systemConfig']){
          let systemConfigName=this.paramsJson['systemConfig'];
           this.getSystemConfigProperties(systemConfigName);
         }
         if(data?.gsearch){
          this.isListShow=true;
        }
         if(!this.agGridName){
            this.agGridName="ENTITY_WORKORDER_AGGRID";
        }

      }

      
  });

  }

  getSystemConfigProperties(systemConfigName){    
    let json =JSON.parse(this.systemConfigService.getSysConfig ('WORKORDER_APP_CUSTOM_CONFIGURATION')?.value);   
    if(json && json[systemConfigName]){
           let workorderObj=json[systemConfigName];
            if(workorderObj && workorderObj["dashboardTitle"]){
              this.dashboardTitle=workorderObj["dashboardTitle"];
            } 
            if(workorderObj && workorderObj["workorderListTitle"]){
              this.workorderListTitle=workorderObj["workorderListTitle"];
            } 
            if(workorderObj && workorderObj["agGridName"]){
              this.agGridName=workorderObj["agGridName"];
            } 
            if(workorderObj && workorderObj["selectedEntity"]){
              this.selectedEntity=workorderObj["selectedEntity"];
            } 
            if(workorderObj && workorderObj["entityTypeList"]){
              this.entityTypeList=workorderObj["entityTypeList"];
            } 
            this.addWorkorderVisible=workorderObj["addWorkorderVisible"]?workorderObj["addWorkorderVisible"]:false;

            if(workorderObj && workorderObj["entityTypeListVisible"]){
              this.entityTypeListVisible=workorderObj["entityTypeListVisible"];
            } 


            if(workorderObj && workorderObj["adHocWorkorderAgGridName"]){
              this.adHocWorkorderAgGridName=workorderObj["adHocWorkorderAgGridName"];
            } 
            if(workorderObj && workorderObj["adhocWorkorderentityTypeList"]){
              this.adhocWorkorderentityTypeList=workorderObj["adhocWorkorderentityTypeList"];
            } 
            if(workorderObj && workorderObj["adhocWorkorderHeaderTitle"]){
              this.adhocWorkorderHeaderTitle=workorderObj["adhocWorkorderHeaderTitle"];
            } 
            
              this.addAdhocWorkorderVisible=workorderObj["addAdhocWorkorderVisible"]?workorderObj["addAdhocWorkorderVisible"]:false;
              this.isAdHocProject=workorderObj["isAdHocProject"]?workorderObj["isAdHocProject"]:false;
              this.addWorkorderListToggelVisible=workorderObj["addWorkorderListToggelVisible"]?workorderObj["addWorkorderListToggelVisible"]:false;
              this.isScopeFieldVisible=workorderObj["isScopeFieldVisible"]?workorderObj["isScopeFieldVisible"]:false;
    }
  }

  spilitTitle() {
    if(this.title){
     var splitted = this.title?.split("$", 20); 
     splitted?.forEach((element,index) => {
      if(index!=0 && element){
        var jsonStr = '{"' + element.replace(/ /g, '", "').replace(/=/g, '": "') + '"}';
        if(jsonStr){
          try{
            let a=JSON.parse(jsonStr);
            let keys=Object.keys(a);
            if(keys && keys.length>0){
              let key=Object.keys(a)[0];
              if(key){
                this.paramsJson[key]=a[key];  
              }
            }
          }catch(exception){
          }    
       }
      }
     });
   }
  }


  ngOnInit(): void {
    this.getStates();
  }

  ngAfterViewInit() {
    this.getAllMaintainenanceDashboard();
  }

  getAllMaintainenanceDashboard(){
    this.getAPI();
    this.AssignedUsers();
    this.scheduleFrequency30Days();
    this.getAllMaintenanceDashboardData();
    this.MaintenanceByCategory();
    this.schedulePiechartData = this.allMaintenanceDashboardData?.scheduleFrequencyData.data.map(d => [d.name, d.value]);
    this.scheduleFrequencyChart();
    this.assignedVendor();
    this.topCard();
  }


  getStates() {
    this.maintenanceService.getStateListByRegionId().subscribe((res) => {
      if (this.hasValue.transform(res)) {
        res = _.sortBy(res, ['name']);
        let newObj = { "displayName": "All states" };
        res.unshift(newObj);
        this.stateList = res;
        this.selectedState = { "displayName": "All states" }
      }
    });
  }

  getCityList(event) {
    if (event && event.id) {
      this.maintenanceService.getCityListByRegionId(event.id).subscribe((res) => {
        if (this.hasValue.transform(res)) {
          res = _.sortBy(res, ['geoName']);
          let newObj = { "geoName": "All cities" };
          res.unshift(newObj);
          this.cityList = res;
          this.selectedCity = { "geoName": "All cities" };
          this.getAllMaintainenanceDashboard();
        }else{
          this.cityList =[ { "geoName": "All cities" }];
          this.selectedCity = { "geoName": "All cities" };
          this.getAllMaintainenanceDashboard();
        }
      });
    }else{
      this.cityList =[ { "geoName": "All cities" }];
      this.selectedCity = { "geoName": "All cities" };
      this.getAllMaintainenanceDashboard();
    }
  }
  getAllMaintenanceDashboardData() {
    try {
      this.allMaintenanceDashboardData = JSON.parse(this.systemConfigService.getSysConfig('MAINTENANCE_DASHBOARD_DATA')?.value);
    } catch (Exception) { }
  }

  scheduleFrequencyColumn() {
    this.scheduleFrequencyColumnOption = this.chartService.getBasicChartConfiguration('column');
    this.scheduleFrequencyColumnOption.container = 'scheduleFrequencyChart';
    this.scheduleFrequencyColumnOption.updateFlag = false;
    this.scheduleFrequencyColumnOption.chart = {
      type: 'column',
      height: '50%',
    },
      this.scheduleFrequencyColumnOption.xAxis = {
        labels: {
          enabled: false,
        },
        gridLineWidth: 0,
        lineWidth: 0, 
        tickWidth: 0, 
      },
      this.scheduleFrequencyColumnOption.yAxis = {
        min: 0,
        tickInterval: 1,
        title: {
          text: this.allMaintenanceDashboardData.scheduleFrequencyColumnData.yAxisTitle
        },
        gridLineWidth: 0.3,
       
      },
      this.scheduleFrequencyColumnOption.tooltip = {
        useHTML: true,
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF Total: </span><b>{point.y}</b><br/>',
      },
      this.scheduleFrequencyColumnOption.plotOptions = {
        column: {
          borderWidth: 0,
          dataLabels: {
            enabled: false,
            format: '{point.y:.1f}%'
          },
          pointWidth: 10 
        }
      },
      this.scheduleFrequencyColumnOption.legend = {
        enabled: false,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal'
      };
      if (this.getHasValue(this.scheduleFrequencyThirtyDays.data)) {
        this.scheduleFrequencyColumnOption.series = [
          {
            color: this.allMaintenanceDashboardData.scheduleFrequencyColumnData.color,
            data: this.scheduleFrequencyThirtyDays.data,
          },
        ];
      } else {
        this.scheduleFrequencyColumnOption.series = [
          {
            color: this.allMaintenanceDashboardData.scheduleFrequencyColumnData.color,
            data: [],
          },
        ];
      }
    if (
      this.getHasValue(this.scheduleFrequencyColumnSubject) &&
      this.getHasValue(this.scheduleFrequencyColumnSubject._value)
    ) {
      this.scheduleFrequencyColumnSubject.next(this.scheduleFrequencyColumnOption);
    } else {
      this.scheduleFrequencyColumnSubject = new BehaviorSubject(this.scheduleFrequencyColumnOption);
    }

  }

  scheduleFrequencyChart() {
    this.scheduleFrequencyPieOption = this.chartService.getBasicChartConfiguration('pie');
    this.scheduleFrequencyPieOption.container = 'scheduleFrequencyPieChart';
    this.scheduleFrequencyPieOption.chart = {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '70%',
    },
      this.scheduleFrequencyPieOption.tooltip = {
        useHTML: true,
        headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span><b>{point.y}</b><br/>'
      },
      this.scheduleFrequencyPieOption.accessibility = {
        point: {
          valueSuffix: '%'
        }
      },
      this.scheduleFrequencyPieOption.plotOptions = {
        pie: {
          colors: this.allMaintenanceDashboardData.scheduleFrequencyData.colors,
          borderWidth:0,
          dataLabels: {
            enabled: true,
            format: '{point.name}<br>{point.y}',
            distance: 10,
            style: {
              fontWeight: 'normal',
              color: ''
            }
          },
          showInLegend: false,
          startAngle: 0,
          endAngle: 360,
          center: ['50%', '50%'],
          size: '100%'

        }
      },
      this.scheduleFrequencyPieOption.series = [{
        type: 'pie',
        name: '',
        innerSize: 120,
        
        data: this.schedulePiechartData,
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'vertical',
          itemMarginTop: 10,
          itemMarginBottom: 10
        }
      }]
    if (this.getHasValue(this.scheduleFrequencyPieSubject) && this.getHasValue(this.scheduleFrequencyPieSubject._value)) {
      this.scheduleFrequencyPieSubject.next(this.scheduleFrequencyPieOption);
    } else {
      this.scheduleFrequencyPieSubject = new BehaviorSubject(this.scheduleFrequencyPieOption);
    }
  };

  assignedVendorColumnChart() {
    this.assignedVendorOption = this.chartService.getBasicChartConfiguration('column');
    this.assignedVendorOption.container = 'assignedVendor';
    this.assignedVendorOption.updateFlag = false;
    this.assignedVendorOption.chart = {
      type: 'column',
      height: '45%',
    };
  
    this.assignedVendorOption.yAxis = {
      min: 0,
      tickInterval: 1,
      title: {
        text: this.allMaintenanceDashboardData.assignedVendorData.yAxisTitle
      },
      gridLineWidth: 0.3,
    };
  
    this.assignedVendorOption.tooltip = {
      useHTML: true,
      headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
      pointFormat: '<span style="color:{point.color}">\u25CF</span><b>{point.y}</b><br/>',
    };
  
    this.assignedVendorOption.plotOptions = {
      column: {
        borderWidth: 0,
        dataLabels: {
          enabled: false,
          format: '{point.y:.1f}%'
        },
        pointWidth: 35
      }
    };
  
    this.assignedVendorOption.legend = {
      enabled: false,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    };

    if (this.getHasValue(this.assignedVendorData)) {
      this.assignedVendorOption.xAxis = {
        categories: this.assignedVendorData.categories,
        labels: {
          format: '{value:%e %b}',
        },
      };
    
      this.assignedVendorOption.series = [
        {
          data: this.assignedVendorData.data.map((item, index) => ({
            name: item.name,
            y: item.y,
            color: this.allMaintenanceDashboardData.assignedVendorData.colors[index],
          })),
        },
      ];
    } else {
      this.assignedVendorOption.xAxis = {
        categories: [],
        labels: {
          format: '{value:%e %b}',
        },
      };
    
      this.assignedVendorOption.series = [
        {
          data: [],
        },
      ];
    };
  
    if (
      this.getHasValue(this.assignedVendorSubject) &&
      this.getHasValue(this.assignedVendorSubject._value)
    ) {
      this.assignedVendorSubject.next(this.assignedVendorOption);
    } else {
      this.assignedVendorSubject = new BehaviorSubject(this.assignedVendorOption);
    }
  }
  


  assignedUsersColumnChart() {
    this.assignedUsersoption = this.chartService.getBasicChartConfiguration('column');
    this.assignedUsersoption.container = 'assignedUsers';
    this.assignedUsersoption.updateFlag = false;
    
    this.assignedUsersoption.chart = {
      type: 'column',
      height: '45%',
    },

      this.assignedUsersoption.yAxis = {
        min: 0,
        tickInterval: 1,
        title: {
          text: this.allMaintenanceDashboardData.assignedUsersData.yAxisTitle
        },
        gridLineWidth: 0.3,
      },
      this.assignedUsersoption.tooltip = {
        useHTML: true,
        headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span><b>{point.y}</b><br/>',
      },
      this.assignedUsersoption.plotOptions = {
        column: {
          borderWidth: 0,
          dataLabels: {
            enabled: false,
            format: '{point.y:.1f}%'
          },
          pointWidth: 35
        }
      },
      this.assignedUsersoption.legend = {
        enabled: false,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal'
      };
      if (this.getHasValue(this.assignedUsers)) {
        this.assignedUsersoption.xAxis = {
          categories: this.getHasValue(this.assignedUsers.categories) ? this.assignedUsers.categories : [],
          labels: {
            format: '{value:%e %b}',
          },
        };
      
        this.assignedUsersoption.series = [
          {
            data: this.getHasValue(this.assignedUsers.data)
              ? this.assignedUsers.data.map((obj, index) => ({
                  name: obj.name,
                  y: obj.count,
                  color: this.allMaintenanceDashboardData.assignedUsersData.colors[index],
                }))
              : [],
          },
        ];
      } else {
        this.assignedUsersoption.xAxis = {
          categories: [],
          labels: {
            format: '{value:%e %b}',
          },
        };
        
        this.assignedUsersoption.series = [
          {
            data: [],
          },
        ];
      }
      
    if (
      this.getHasValue(this.assignedUsersSubject) &&
      this.getHasValue(this.assignedUsersSubject._value)
    ) {
      this.assignedUsersSubject.next(this.assignedUsersoption);
    } else {
      this.assignedUsersSubject = new BehaviorSubject(this.assignedUsersoption);
    }

  }

  maintenanceCategory() {
    this.maintenanceCategoryOption = this.chartService.getBasicChartConfiguration('column');
    this.maintenanceCategoryOption.container = 'monthlyProjectChart';
    this.maintenanceCategoryOption.updateFlag = false;
    this.maintenanceCategoryOption.chart = {
      type: 'column',
      height: '20%',
    },
      this.maintenanceCategoryOption.yAxis = {
        min: 0,
        title: {
        },
        
      },
      this.maintenanceCategoryOption.tooltip = {
        useHTML: true,
        headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span><b>{point.y}</b><br/>',
      },
      this.maintenanceCategoryOption.plotOptions = {
        column: {
          borderWidth: 0,
          dataLabels: {
            enabled: false,
            format: '{point.y:.1f}%'
          },
          groupPadding: 0.1,
          pointWidth: 30 
        }
      },
      this.maintenanceCategoryOption.legend = {
        enabled: true
      };

      if (this.getHasValue(this.MaintenanceByCategoryData)) {
        this.maintenanceCategoryOption.xAxis = {
          categories: this.getHasValue(this.MaintenanceByCategoryData.categories) ? this.MaintenanceByCategoryData.categories : [],
          title: {
            text: this.allMaintenanceDashboardData?.projectCompletionTrend?.xAxisTitle,
            margin: 10 
          },
          labels: {
            format: '{value:%e %b}',
          },
        };
      
        const transformedData = {
          data: []
        };
        
        const keys = Object.keys(this.MaintenanceByCategoryData.data);
        keys.forEach((key, index) => {
          if (key !== "name") {
            transformedData.data.push({
              name: key,
              data: this.MaintenanceByCategoryData.data[key],
              color: this.allMaintenanceDashboardData?.projectCompletionTrend?.colors[index] 
            });
          }
        });
      
        const order = ["New", "Assigned", "In Progress", "Completed"];
      
        const modifiedData = transformedData.data.sort((a, b) => {
          const indexA = order.indexOf(a.name);
          const indexB = order.indexOf(b.name);
          return indexA - indexB;
        });
      
        this.maintenanceCategoryOption.series = modifiedData;
      } else {
        this.maintenanceCategoryOption.xAxis = {
          categories: [],
          title: {
            text: this.allMaintenanceDashboardData?.projectCompletionTrend?.xAxisTitle,
            margin: 10
          },
          labels: {
            format: '{value:%e %b}',
          },
        };
      
        this.maintenanceCategoryOption.series = [];
      }
      
      if (
        this.getHasValue(this.maintenanceCategorySubject) &&
        this.getHasValue(this.maintenanceCategorySubject._value)
      ) {
        this.maintenanceCategorySubject.next(this.maintenanceCategoryOption);
      } else {
        this.maintenanceCategorySubject = new BehaviorSubject(this.maintenanceCategoryOption);
      }
      
    if (
      this.getHasValue(this.maintenanceCategorySubject) &&
      this.getHasValue(this.maintenanceCategorySubject._value)
    ) {
      this.maintenanceCategorySubject.next(this.maintenanceCategoryOption);
    } else {
      this.maintenanceCategorySubject = new BehaviorSubject(this.maintenanceCategoryOption);
    }

  }

  getHasValue(value) {
    return this.hasValue.transform(value);
  };

  listIconClick(event){
    if(event && event[this.fromDashboard]!=undefined && event[this.fromDashboard]!=null){
      this.isListShow=event[this.fromDashboard];
    }
  }


  buttonClick(data,name) {

    data.name=name;
    data._value.chart.height='50%';
    data._value.container = 'newChart';
    const dialogRef = this.genericModalService.openDialog(DashboardPopUpWindowComponent, {
      width: '65em',
      height: '40em',
      data: data
    })
  }

  actionPage(data) {
    this.coreUtil.buttonAction(data);
  }


  getAPI(){
    this.maintenanceService.getCategoryListByApplicationName(this.appName, this.selectedState.id, this.selectedCity.id, this.entityType,this.categoryJson).subscribe((res) =>{
      this.mainatenanceCardData= "";
      if (this.hasValue.transform(res)) {
        this.mainatenanceCardData =res['Project'];
      }
    });
  }




  AssignedUsers(){
    this.maintenanceService.AssignedUsers(this.appName,this.selectedState.id, this.selectedCity.id, this.entityType,this.categoryJson).subscribe((res) =>{
      this.assignedUsers ="";
      if (this.hasValue.transform(res)) {
        this.assignedUsers =res['assignee'];
      }
      this.assignedUsersColumnChart();
    });
  }


  scheduleFrequency30Days(){
    this.maintenanceService.scheduleFrequency30Days(this.appName,this.selectedState.id, this.selectedCity.id, this.entityType,this.categoryJson).subscribe((res) =>{
      this.scheduleFrequencyThirtyDays ="";
      if (this.hasValue.transform(res)) {
        this.scheduleFrequencyThirtyDays =res['schedule'];
      }
      this.scheduleFrequencyColumn();
    });
  }

  MaintenanceByCategory(){
    this.maintenanceService.MaintenanceByCategory(this.appName,this.selectedState.id, this.selectedCity.id, this.entityType,this.categoryJson).subscribe((res) =>{
      this.MaintenanceByCategoryData = "";
      if (this.hasValue.transform(res)) {
        this.MaintenanceByCategoryData =res.maintenance;
      }
      this.maintenanceCategory();
    });
  }


  assignedVendor(){
    this.maintenanceService.assginedVendor(this.appName,this.selectedState.id, this.selectedCity.id, this.entityType,this.categoryJson).subscribe((res) =>{
      this.assignedVendorData = "";
      if (this.hasValue.transform(res)) {
        this.assignedVendorData =res.assignedVendorData;
      }
      this.assignedVendorColumnChart();
    });
  }

  topCard(){
    this.maintenanceService.topCard(this.appName,this.selectedState.id, this.selectedCity.id, this.entityType,this.categoryJson).subscribe((res) =>{
      this.topCardData = "";
      if (this.hasValue.transform(res)) {
        this.topCardData =res.topCard;
      }
    });
  }

}
