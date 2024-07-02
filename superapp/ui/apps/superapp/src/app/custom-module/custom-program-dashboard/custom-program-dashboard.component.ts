import { Component, OnInit } from '@angular/core';
import { HasValuePipe, CoreUtilService, SystemConfigService } from '@enttribe/core';
import { ChartService, IChartOptions } from '@enttribe/core/chart';
import { TranslatePipe } from '@enttribe/core/tools';
import { HasPermissionPipe } from '@enttribe/core/user';
import { UserService } from '@enttribe/core/user';
import { ProgramService } from '@enttribe/modules-program-entity-program-management';
import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { DashboardPopUpWindowComponent } from '../dashboard-pop-up-window/dashboard-pop-up-window.component';
import { ActivatedRoute, Router } from '@angular/router';
import{CustomProgramService} from './custom-program.service';
import { DatePipe } from '@angular/common';
import { GenericModalService } from '@enttribe/core/tools/generic-modal';

@Component({
  selector: 'wo-custom-program-dashboard',
  templateUrl: './custom-program-dashboard.component.html',
  styleUrls: ['./custom-program-dashboard.component.scss']
})
export class CustomProgramDashboardComponent implements OnInit {
    appName:string='Superapp_APP_NAME';
    basePath='superapp/superapp-custom-module';
    

    loadingType  = "external";
 listPath : any = "program_dashboard";
 isListView : boolean =false;
 isDashboardIconVisible =true;
fromDashboard : any = "PROGRAM_DASHBOARD";
  public eventBus: any;
  paramsJson={};

adhocWorkorderHeaderTitle : any = "PROGRAM";
adhocWorkorderScopeHeaderTitle : any = "PROGRAM>SCOPE";
title : any = "PROGRAM";
entityType : any = "Program";
isAdhocWorkorderAddVisible =false;
isScopeAdhocWorkorderAddVisible =false;
isScopeFieldVisible =false;

  viewProgramList(event){
    if(event && event[this.fromDashboard]!=undefined && event[this.fromDashboard]!=null){
      this.isListView=event[this.fromDashboard];
    }
  }

  insigtsCardData:any;
showAllItems = false;
visibleItems=5;
showAllGeopraphyItems = false;
visibleGeopraphyItems=11;
programList:any=[];
selectedProgram:any;
stateList:any=[];
selectedState:any={"displayName":"All"};
cityList:any=["All"];
selectedCity:any="All";
yearList:any=[{label:'CY 2022',value:'2022'},{label:'CY 2023',value:'2023'},{label:'CY 2024',value:'2024'}];
selectedYear:any;
occupancySubject:any;
occupancyOption:any;
AreaSubject: BehaviorSubject<IChartOptions>;
connectionColumnOptions:any;
connectionColumnSubject:any;
columnOptions: any;
columnSubject: any;
chargerOption:any;
chargerSubject:any;
ticketSubject:any;
ticketOption:any;
monthlyProjectSubject:any;
monthlyprojectOption:any;
connectionColumnChartOptions: any;
aeroUp = '↑';
aeroDown = '↓';
projectCard:any;
monthlyTrend:any;



modeWiseData:any;
capacityChargerData:any;
connectionStandardData:any;
geographyData:any;
planningData:any;
chargingClassification:any;

  public pageActions = [
    { label: "NEW_WINDOW", icon: "New-Window-Outline", action: "newWindow" },
  ];

  pageInfo: any = {
    name: this.translate.transform('PROGRAM'),
    hideGlobalSearch:true,
    headerIcon: 'icomoon coverage',
    icon: 'icomoon prop',
    navigation: [
      {
        title: this.translate.transform('Dashboard'),
        route: '',
      },
    ],
    searchMenu: [
      {
        displayName: this.translate.transform('Dashboard'),
        value: 'Dashboard',
        icon: 'Form-Builder$fontset$icomoon',
        selected: true,
      },
    ],
  };

programDashboardData:any={}

  constructor( 
    public hasValue: HasValuePipe,
    private translate: TranslatePipe,
    public hasPermission: HasPermissionPipe,
    public userService: UserService,
    private coreUtil: CoreUtilService,
    private  systemConfigService:SystemConfigService,
    private genericModalService: GenericModalService,
    private chartService: ChartService,
    private programService:ProgramService,
    private route:ActivatedRoute,
    private router:Router,
    private datePipe : DatePipe,
    private customProgramService:CustomProgramService
    ) { 
      this.route.queryParams.subscribe(data=>{
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.entityType='';
        if(data?.pageName){
          this.entityType=data.pageName;
         }
         this.isListView=data?.isListShow=="true"?true:false;
         if(data?.title){
           this.title=data.title;
           this.spilitTitle();
  
           if(this.paramsJson && this.paramsJson['systemConfig']){
            let systemConfigName=this.paramsJson['systemConfig'];
             this.getSystemConfigProperties(systemConfigName);
           }
  
           if(data?.gsearch){
            this.isListView=true;
          }
    
        }
  
        
    });
    
  }


ngOnInit(): void {
  this.getProgramList();
  this.selectedYear='2023';
  this.getStateListData();
  this.getProgramDashboardApiData();
}



getProgramDashboardApiData(){
  this.getProgramDashboardData();
  this.getModeWiseData();
  this.getChargingCapacityData();
  this.getPricingmodelData();
  this.getGeographyData();
  this.getPlanningStateData();
  this.getChargingStationClassification();
  this.getProjectCard();
  this.getMonthlyTrend();
  this.getInsights();
  console.log("program is", this.selectedProgram );
  
}
ngAfterViewInit(){
  

  this.ticketChart();
}
getProgramDashboardData(){
  try {
    this.programDashboardData =JSON.parse (this.systemConfigService.getSysConfig('PROGRAM_DASHBOARD_DATA').value);   
  } catch (Exception) {}
}
  getStateListData() {
    this.programService.getGeographyL2Data().subscribe((res) => {
       if(this.hasValue.transform(res)){
      res = _.sortBy(res, ['name']);
      let newObj={"displayName":"All"};
      res.unshift(newObj);
      this.stateList=   res;
       }
    }); 
   }

   pricingModel()
   {
    this.connectionColumnOptions = this.chartService.getBasicChartConfiguration('column');
    this.connectionColumnOptions.container='ExecutionColumChartOptions';
    this.connectionColumnOptions.updateFlag=false;
    this.connectionColumnOptions.chart= {
        type: 'column'
    },
   
   
    this.connectionColumnOptions.xAxis= {
      categories: this.connectionStandardData?.pricingModel?.categories,  
      labels: {
        format:'{value:%e %b}',
      },
    },
    this.connectionColumnOptions.yAxis= {
        min: 0,
        tickInterval:5000,
        title: {
            text: this.programDashboardData?.pricingModel.yAxis.title
        }, 
        gridLineWidth: 0.3,
    },
    this.connectionColumnOptions.tooltip= {
        headerFormat: '<b>{point.x} </b><br/>',
        useHTML:true,
        pointFormat: '<div>Total: {point.y} k</div>', 
    },
    this.connectionColumnOptions.plotOptions= {
     column: {
       colorByPoint: true,
       colors:this.programDashboardData?.pricingModel.color,
       borderWidth: 0,
       dataLabels: {
         enabled: false,
         format: '{point.y:.1f}%'
       }
     }
   },
    this.connectionColumnOptions.legend={
      enabled: false
    },
    this.connectionColumnOptions.series= [
     {
       name: '',
       colorByPoint: true,
       data:  this.connectionStandardData?.pricingModel?.data 
     }
   ];
    if (
      this.getHasValue(this.connectionColumnSubject) &&
      this.getHasValue(this.connectionColumnSubject._value)
    ) {
      this.connectionColumnSubject.next(this.connectionColumnOptions);
    } else {
      this.connectionColumnSubject = new BehaviorSubject(this.connectionColumnOptions);
    }  
   
   }

   projectCompletionTrend()
   {
    this.monthlyprojectOption = this.chartService.getBasicChartConfiguration('column');
    this.monthlyprojectOption.container='monthlyProjectChart';
    this.monthlyprojectOption.updateFlag=false;
    this.monthlyprojectOption.chart= {
        type: 'column',
        height: '86%',
    },
   
   
    this.monthlyprojectOption.xAxis= {
      categories: this.monthlyTrend.categories,
      title:{
       text: this.programDashboardData?.projectCompletionTrend?.xAxisTitle
      },
      labels: {
        format:'{value:%e %b}',
      },
    },
    this.monthlyprojectOption.yAxis= {
        min: 0,

        tickInterval:100,
        title: {
            text: this.programDashboardData.projectCompletionTrend?.yAxisTitle
        },  
        
    },
    this.monthlyprojectOption.tooltip= {
        headerFormat: '<b>{point.x} </b><br/>',
        useHTML:true,
        pointFormat: '<div>Total: {point.y}</div>', 
    },
    this.monthlyprojectOption.plotOptions= {
     column: {
       borderWidth: 0,
       dataLabels: {
         enabled: false,
         format: '{point.y:.1f}%'
       },
       groupPadding:0.3,
       pointWidth:9
     }
   },
    this.monthlyprojectOption.legend={
      enabled: true,
    },
   this.monthlyprojectOption.colors= this.programDashboardData?.projectCompletionTrend?.colors,
   this.monthlyprojectOption.series= this.monthlyTrend.data;
    if (
      this.getHasValue(this.monthlyProjectSubject) &&
      this.getHasValue(this.monthlyProjectSubject._value)
    ) {
      this.monthlyProjectSubject.next(this.monthlyprojectOption);
    } else {
      this.monthlyProjectSubject = new BehaviorSubject(this.monthlyprojectOption);
    }  
   
   }

chargingStationClassification() {
  this.occupancyOption = this.chartService.getBasicChartConfiguration('heatmap');
  this.occupancyOption.container = 'occupanyPieChart';
  this.occupancyOption.chart= {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 0,
      height: '64%',
    },
    this.occupancyOption.tooltip={
      enabled: true,
      formatter: function() {
      var value = this.point.value; 
      if (this.series.chart[2]) { 
      value = this.point[2]; 
      }
      return 'Value: ' + value; 
      }
      },
  
  
    this.occupancyOption.title={
      text: this.programDashboardData?.chargingStationClassification?.title,
      align:'bottom',
      style:{color: '#000000', fontSie:'1em'},
      y:393,
      x:350
    },
  
    this.occupancyOption.xAxis= {
      categories: this.chargingClassification?.chargingStationClassification?.xAxis.states 
    },
  
    this.occupancyOption.yAxis={
      categories: this.chargingClassification?.chargingStationClassification?.yAxis.categories,
      title: this.programDashboardData?.chargingStationClassification?.yAxis.title,
    },
  
  
    this.occupancyOption.colorAxis={
      min: 0,
      minColor: this.programDashboardData?.chargingStationClassification?.color?.minColor,
        maxColor: this.programDashboardData?.chargingStationClassification?.color?.maxColor
    },
  
    this.occupancyOption.legend= {
      align: 'bottom',
      layout: 'vertical',
      margin: 0,
      enabled:false
    },
  
    this.occupancyOption.series= [{
      name: '',
      borderWidth: 4,
      color:'white',
      data:this.chargingClassification?.data,   
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }];

  if (this.getHasValue(this.occupancySubject) && this.getHasValue(this.occupancySubject._value)) {
    this.occupancySubject.next(this.occupancyOption);
  } else {
    this.occupancySubject = new BehaviorSubject(this.occupancyOption);
  }
};



chargerCapacity() {
  this.chargerOption = this.chartService.getBasicChartConfiguration('pie');
  this.chargerOption.container = 'connectionChart';
  this.chargerOption.chart = {
    type: 'pie',
    height: '100%',
  };
  this.chargerOption.title = null;
  this.chargerOption.tooltip = {
    enabled: true
  };
  this.chargerOption.yAxis = {
    lineWidth: 0,
    tickPositions: []
  };
  this.chargerOption.plotOptions = {
    pie: {
      innerSize: 0,
      size: 280,
      depth: 40,
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.y} k',
        distance: '-32%',
        style: {
          fontweight: '100',
          color: 'white'
        }
      }
    }
  };
  this.chargerOption.colors = this.programDashboardData?.chargerCapacity?.color;
  
  const data = Object.keys(this.capacityChargerData).map(key => {
    const name = key.toUpperCase();
    const value = parseFloat(this.capacityChargerData[key]);

    return {
      name: `${name} - ${value}`,
      y: value
    };
  });
  

  this.chargerOption.series = [{
    showInLegend: true,
    data: data  
  }];
  this.chargerOption.legend = {
    enabled: true,
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    itemMarginTop: 15,
    margin : 20,
    itemStyle: {
      fontWeight: 'normal',
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      marginLeft:'1em',
    },
    labelFormatter: function () {
      return '<span style="color:' + this.color + '; margin-left: 1em;">' + this.name + '</span>';
    }
  };
  if (this.getHasValue(this.chargerSubject) && this.getHasValue(this.chargerSubject._value)) {
    this.chargerSubject.next(this.chargerOption);
  } else {
    this.chargerSubject = new BehaviorSubject(this.chargerOption);
  }
};


ticketChart() {
  this.ticketOption = this.chartService.getBasicChartConfiguration('variablepie');
  this.ticketOption.container = 'ticketChart';
  this.ticketOption.chart = {
    type: 'variablepie',
    height: '89%',
    marginBottom: '50',
    marginTop:'-20'
  },

    this.ticketOption.title = {
      text: '',
      align: 'left'
    },
    this.ticketOption.tooltip = {
      headerFormat: '',
      useHTML: true,
      pointFormat: '<div><b>{point.name}</b></div><div>Total: {point.y}</div>',
    };
    this.ticketOption.credits = {
      enabled: false
    },
    this.ticketOption.plotOptions = {
      variablepie: {
        innerSize: 100,
        depth: 0,
        borderWidth: 0,
        dataLabels:{
          enabled:false,
        }
      },
      areaspline: {
        fillOpacity: 0.1
      },
      series: {
        groupPadding: .15
      },
    },
    this.ticketOption.series = [{
      showInLegend: true,
      minPointSize: 10,
      innerSize: '30%',
      size:'80%',
      zMin: 0,
      name: '',
      data:this.programDashboardData?.ticketClassification.data
    }];

    this.ticketOption.legend = {
      align: 'bottom',
      verticalAlign: 'bottom',
      borderWidth: 0,
      backgroundColor: '#FFFFFF',
      itemMarginBottom: 12,
      itemWidth: 150,
      x: 0,  
      y: 34, 
      margin : 30,
      itemStyle: {
        fontWeight: 'normal',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },
      labelFormatter: function () {
      
        var index = this.index;
    
        if (index % 2 == 0) {
          return '<span>' + this.name + '</span>';
        } else {
          return '<br><span>' + this.name + '</span>';
        }
      }
    };


  if (this.getHasValue(this.ticketSubject) && this.getHasValue(this.ticketSubject._value)) {
    this.ticketSubject.next(this.ticketOption);
  } else {
    this.ticketSubject = new BehaviorSubject(this.ticketOption);
  }
};

getHasValue(value) {
  return this.hasValue.transform(value);

}

getColor(index) {
  const colors = ['#252525', '#252525', '#252525'];
  return colors[index % colors.length];
}

getClass(str: string) {
  switch (str) {
    case '↑': return 'up';
    case '↓': return 'down';
   
    default: return '';
  } 
}
getUpClass(str: string) {
  switch (str) {
    case '':
      return 'up';
    case '▼':
      return 'down';
   
    default:
      return '';
  }
}
getProgramList(){
this.programService.getProgramList(this.appName).subscribe((res) => {
  if(this.hasValue.transform(res)){
    res = _.sortBy(res, ['referenceId']);
    this.programList=   res;
    this.selectedProgram=this.programList[0];
  }
}); 
}

getCityList(event){
  if(event && event.id){
    this.programService.getCityListByStateId(event.id).subscribe((res) => {
      if(this.hasValue.transform(res)){
        res = _.sortBy(res, ['geoName']);
        let newObj={"geoName":"All"};
        res.unshift(newObj);
        this.cityList=   res;
        this.selectedCity={"geoName":"All"};

      }else{
        this.cityList =[ { "geoName": "All cities" }];
        this.selectedCity = { "geoName": "All cities" };
        this.getProgramDashboardApiData();
      }
    }); 
  }else{
    this.cityList = [{"geoname": "All"}];
    this.selectedCity={"geoName":"All"};
    this.getProgramDashboardData();
  }
  this.getProgramDashboardData();
}

breadCrumpAppName(data){
  return _.startCase(_.toLower(data.replaceAll('_APP_NAME','').replaceAll('-',' ')));
}
actionPage(data) {
  this.coreUtil.buttonAction(data);
}

toggleVisibleItems() {
  if (this.showAllItems) {
    this.visibleItems = 5;
  } else {
    this.visibleItems = this.visibleItems + 2;
  }
 
  
  this.showAllItems = !this.showAllItems;
};

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

toggleVisibleGeopraphyItems() {
  if (this.showAllGeopraphyItems) {
    this.visibleGeopraphyItems =11;
  } else {
    this.visibleGeopraphyItems = this.programDashboardData.geography.length;
  }
  this.showAllGeopraphyItems = !this.showAllGeopraphyItems;
};


convertToTime(timestamp){
  const date = new Date(timestamp);
  const timeDiff = Date.now() - date.getTime();
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  if (secondsDiff < 60) {
    return 'Just now';
  } else if (minutesDiff < 60) {
    return `${minutesDiff}m ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}h ago`;
  } else {
    return this.datePipe.transform(date, 'dd MMM yyyy') || '';
  }
}



getSystemConfigProperties(systemConfigName){
  let json =JSON.parse(this.systemConfigService.getSysConfig ('WORKORDER_APP_CUSTOM_CONFIGURATION')?.value);   
  if(json && json[systemConfigName]){
         let programObj=json[systemConfigName];
          
          if(programObj && programObj["adhocWorkorderHeaderTitle"]){
            this.adhocWorkorderHeaderTitle=programObj["adhocWorkorderHeaderTitle"];
          } 
          if(programObj && programObj["adhocWorkorderScopeHeaderTitle"]){
            this.adhocWorkorderScopeHeaderTitle=programObj["adhocWorkorderScopeHeaderTitle"];
          } 
          if(programObj && programObj["title"]){
            this.title=programObj["title"];
          } 
          if(programObj && programObj["entityType"]){
            this.entityType=programObj["entityType"];
          }   
            this.isAdhocWorkorderAddVisible=programObj["isAdhocWorkorderAddVisible"]?programObj["isAdhocWorkorderAddVisible"]:false;
            this.isScopeAdhocWorkorderAddVisible=programObj["isScopeAdhocWorkorderAddVisible"]?programObj["isScopeAdhocWorkorderAddVisible"]:false;
            this.isScopeFieldVisible=programObj["isScopeFieldVisible"]?programObj["isScopeFieldVisible"]:false;

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
getModeWiseData(){
  this.customProgramService.getModeWiseData(this.selectedState.id,this.selectedCity.id).subscribe((res) => {
    if (this.hasValue.transform(res)) {
      this.modeWiseData = res;
    }
  });
}
getChargingCapacityData(){
  this.customProgramService.getChargingCapacity(this.selectedState.id,this.selectedCity.id).subscribe((res) => {
    if (this.hasValue.transform(res)) {
      this.capacityChargerData = res?.chargerCapacity;
      this.chargerCapacity();
    }
  });
}
getPricingmodelData(){
  this.customProgramService.getTopConnectionStandard(this.selectedState.id,this.selectedCity.id).subscribe((res) => {
    if (this.hasValue.transform(res)) {
      this.connectionStandardData = res;
      this.pricingModel();
    }
  });
}
getGeographyData(){
  this.customProgramService.getGeographyData().subscribe((res) => {
    if (this.hasValue.transform(res)) {
      this.geographyData = res;
    }
  });
}
getPlanningStateData(){
  this.customProgramService.getPlanningStateData(this.selectedState.id,this.selectedCity.id).subscribe((res) => {
    if (this.hasValue.transform(res)) {
      this.planningData = res;
    }
  });
}
getChargingStationClassification(){
  this.customProgramService.getChargingClassification().subscribe((res) => {
    if (this.hasValue.transform(res)) {
      this.chargingClassification = res;
      this.chargingStationClassification();
    }
  });
}

getProjectCard(){
  this.customProgramService.getprojectCard(this.appName ,this.selectedState.id,this.selectedCity.id, this.entityType, this.selectedProgram?.id).subscribe((res) => {
    if (this.hasValue.transform(res)) {
      this.projectCard = res.Project;
    }
  });
}


  getMonthlyTrend(){
    this.customProgramService.getMonthlyTrend(this.appName ,this.selectedState.id,this.selectedCity.id, this.entityType, this.selectedProgram?.id).subscribe((res) => {
      if (this.hasValue.transform(res)) {
        this.monthlyTrend = res.projectCompletionTrend;
      }
      this.projectCompletionTrend();
    });
  }

  getInsights(){
    this.customProgramService.getInsightscard(this.appName ,this.selectedState.id,this.selectedCity.id, this.entityType, this.selectedProgram?.id).subscribe((res)=>{
      if (this.hasValue.transform(res)) {
        this.insigtsCardData = res;
      }
    })
  }
}
