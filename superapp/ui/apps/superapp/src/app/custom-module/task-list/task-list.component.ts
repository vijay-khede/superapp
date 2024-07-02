import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemConfigService } from '@enttribe/core';

@Component({
  selector: 'wo-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  appName:string='Superapp_APP_NAME';
  basePath='superapp/superapp-custom-module';
  entityType:string;
  title:string='TASKS';
  paramsJson={};

  
addWorkorderListToggelVisible:boolean=false; 
isAdHocProject:boolean=false;  
adHocTaskAgGridName="ENTITY_WORKORDER_TASK_CUSTOM_SEARCH_AGGRID";
agGridName="ENTITY_WORKORDER_TASK_CUSTOM_SEARCH_AGGRID";


 constructor(private route:ActivatedRoute,private router:Router,private systemConfigService:SystemConfigService) { 
  this.entityType='';
   this.route.queryParams.subscribe(data=>{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     if(data?.pageName){
       this.entityType=data.pageName;
      }

      if(data?.title){
       this.title=data.title;
       this.spilitTitle();

       if(this.paramsJson && this.paramsJson['systemConfig']){
        let systemConfigName=this.paramsJson['systemConfig'];
         this.getSystemConfigProperties(systemConfigName);
       }


      }
 });

 }

  ngOnInit(): void {
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



}
