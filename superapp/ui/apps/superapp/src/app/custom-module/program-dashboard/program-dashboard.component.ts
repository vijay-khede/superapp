import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wo-program-dashboard',
  templateUrl: './program-dashboard.component.html',
  styleUrls: ['./program-dashboard.component.scss']
})
export class ProgramDashboardComponent implements OnInit {

  appName:string='Superapp_APP_NAME';
  basePath='superapp/superapp-custom-module';
  isListShow=false;
  adhocWorkorderHeaderTitle : any = "PROGRAM";
 adhocWorkorderScopeHeaderTitle : any = "PROGRAM>SCOPE";

 title : any = "PROGRAM";
 entityType : any = "Program";
 isAdhocWorkorderAddVisible =false;
 isScopeAdhocWorkorderAddVisible =false;
 isScopeFieldVisible =false;
  

  constructor(private route:ActivatedRoute,private router:Router) { 
    this.route.queryParams.subscribe(data=>{
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.entityType='';
      if(data?.pageName){
        this.entityType=data.pageName;
       }
       if(data?.title){
         this.title=data.title;
        var splitted = this.title.split("$", 10); 
        if(splitted && splitted[1]){
          var isListvale=splitted[1];
          var jsonStr2 = '{"' + isListvale.replace(/ /g, '", "').replace(/=/g, '": "') + '"}';
          if(jsonStr2){
          let a=JSON.parse(jsonStr2);
               this.isListShow=a['isListShow']=='true'?true:false;
           }
        }

      }

  });

  }

  ngOnInit(): void {
  }
  listIconClick(event){
    this.isListShow=event;
  }

}
