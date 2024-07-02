import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreUtilService, SystemConfigService } from '@enttribe/core';
import { TranslatePipe } from '@enttribe/core/tools';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  appName:string='Superapp_APP_NAME';
  basePath='superapp/superapp-custom-module';
  entityType:string;
  title:string;
 isDashboardIconVisible =true;
 fromDashboard : any = "TASK_DASHBOARD";
 isListView=false;

addWorkorderListToggelVisible:boolean=false; 
isAdHocProject:boolean=false;  
adHocTaskAgGridName="ENTITY_WORKORDER_TASK_CUSTOM_SEARCH_AGGRID";
agGridName="ENTITY_WORKORDER_TASK_CUSTOM_SEARCH_AGGRID";


paramsJson={};

 public pageActions = [
  { label: "NEW_WINDOW", icon: "New-Window-Outline", action: "newWindow" },
];

pageInfo: any = {
  name: this.translate.transform('TASK_DASHBOARD'),
  headerIcon: 'icomoon coverage',
  icon: 'icomoon prop',
  navigation: [
    {
      title: this.translate.transform('TASK_DASHBOARD'),
      route: '',
    },
  ],
  searchMenu: [
    {
      displayName: this.translate.transform('TASK_DASHBOARD'),
      value: 'Dashboard',
      icon: 'Form-Builder$fontset$icomoon',
      selected: true,
    },
  ],
};


 constructor(private route:ActivatedRoute,
  private router:Router,
  private translate:TranslatePipe,
  private coreUtil:CoreUtilService,
  private systemConfigService:SystemConfigService
  ) { 
     this.coreUtil.getEventBus().on("GLOBAL_SEARCH_CLEAR", (data) => {
      console.log("GLOBAL_SEARCH_CLEAR_TASK"+data);
      this.isListView=true;
  });
  
  this.entityType='';
   this.route.queryParams.subscribe(data=>{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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
  }


  viewTaskList(event){
    if(event && event[this.fromDashboard]!=undefined && event[this.fromDashboard]!=null){
      this.isListView=event[this.fromDashboard];
    }
  }

  actionPage(data) {
    this.coreUtil.buttonAction(data);
  }


  getSystemConfigProperties(systemConfigName){
    let json =JSON.parse(this.systemConfigService.getSysConfig ('WORKORDER_APP_CUSTOM_CONFIGURATION')?.value);   
    if(json && json[systemConfigName]){
           let taskObj=json[systemConfigName];
            
            if(taskObj && taskObj["adHocTaskAgGridName"]){
              this.adHocTaskAgGridName=taskObj["adHocTaskAgGridName"];
            } 
            if(taskObj && taskObj["agGridName"]){
              this.agGridName=taskObj["agGridName"];
            }   
              this.isAdHocProject=taskObj["isAdHocProject"]?taskObj["isAdHocProject"]:false;
              this.addWorkorderListToggelVisible=taskObj["addWorkorderListToggelVisible"]?taskObj["addWorkorderListToggelVisible"]:false;
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

  globalSearchClick(event) {
    if (event && event === 'TASK_LISTING') {
      this.isListView = true;
    }
  }




  globalSearchClearClick(event) {
    if (event && event === 'TASK_LISTING_CLEAR') {
      this.isListView = true;
    }
  }

}
