import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreUtilService, SystemConfigService } from '@enttribe/core';

@Component({
  selector: 'wo-workorder-dashboard',
  templateUrl: './workorder-dashboard.component.html',
  styleUrls: ['./workorder-dashboard.component.scss']
})
export class WorkorderDashboardComponent implements OnInit {
  appName:string='Superapp_APP_NAME';
  basePath='superapp/superapp-custom-module';
   entityType:string;
   isListShow=false;
   title:any='PROJECTS';
   agGridName="ENTITY_WORKORDER_AGGRID";
   paramsJson={};
   entityTypeList:any=[];
   selectedEntity=''
   dashboardTitle:any="DASHBOARD";
   workorderListTitle:any="PROJECTS";
  addWorkorderVisible=false;
  entityTypeListVisible=false; 
  fromDashboard : any = "WORKORDER_DASHBOARD";
  isDashboardIconVisible =true;


  addWorkorderListToggelVisible:boolean=true; 
  isAdHocProject:boolean=false;  
  addAdhocWorkorderVisible:boolean=true;
  adhocWorkorderentityTypeList=[{"name":"All","value":"all"},{"name":"Candidate","value":"Candidate"},{"name":"Facility","value":"Facility"}];
  adhocWorkorderHeaderTitle='Timeline';
  isScopeFieldVisible =true;
  adHocWorkorderAgGridName='';
  private globalSearch: EventEmitter<any>;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private systemConfig:SystemConfigService,
    private coreUtil:CoreUtilService
 ) { 

  this.globalSearch = this.coreUtil.getEventBus().on("GLOBAL_SEARCH_CLEAR", (data) => {
    console.log("GLOBAL_SEARCH_CLEAR"+data);
    this.isListShow=true;
});




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
        //  if(this.paramsJson && this.paramsJson['isListShow']){
        //   this.isListShow=this.paramsJson['isListShow']=='true'?true:false;
        //  }

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
  }
  
  listIconClick(event){
    if(event && event[this.fromDashboard]!=undefined && event[this.fromDashboard]!=null){
      this.isListShow=event[this.fromDashboard];
    }
  }

  getSystemConfigProperties(systemConfigName){
    let json =JSON.parse(this.systemConfig.getSysConfig ('WORKORDER_APP_CUSTOM_CONFIGURATION')?.value);   
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
            if(workorderObj && workorderObj["addWorkorderVisible"]){
              this.addWorkorderVisible=workorderObj["addWorkorderVisible"];
            } 
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

  globalSearchClick(event) {
    if (event && event === 'WORKORDER_LISTING') {
      this.isListShow = true;
    }
  }




  globalSearchClearClick(event) {
    if (event && event === 'WORKORDER_LISTING_CLEAR') {
      this.isListShow = true;
    }
  }

}



