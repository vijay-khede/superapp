import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreUtilService, HasValuePipe } from '@enttribe/core';
import { TranslatePipe } from '@enttribe/core/tools';
import { IPreviewConfig, PreviewPageBuilderComponent } from '@enttribe/modules-page-builder';
import { Subscription } from 'rxjs';
import { AppPageDirective } from './app-page.directive';


@Component({
    selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageInfo= {
    name: this.translate.transform('Superapp_APP_NAME_HOME_TEXT'),
    headerIcon: 'icomoon coverage',
  };

  navigationInfo:any;
  breadComeTitle=this.translate.transform('Superapp_APP_NAME_HOME_TEXT');  
  templateConfig: IPreviewConfig;
  componentRef:any;
  private subscriptions=new Subscription();
  @ViewChild(AppPageDirective ,{static:true}) appPageDirective!: AppPageDirective;
  pageContext:any;

  constructor(    
    private translate: TranslatePipe,
    private coreUtil:CoreUtilService,
    private componentFactoryResolver:ComponentFactoryResolver,
    private hasValue:HasValuePipe,
    private activateRoute : ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.getDataFromQueryPatameter();
    this.initPageInfo();
   this.breadComeSubscribe();    
  }

  breadComeSubscribe(){
    const breadcomeTitle= this.coreUtil.getEventBus().on('BREADCRUMB_CLICK', (data) => {
      console.log('BREADCRUMB_CLICK',data);
      if(data && data.pageName){
        this.templateConfig={};
        this.templateConfig.templateName=data?.pageName;  
        this.loadComponent();
      }
    });

    this.subscriptions.add(breadcomeTitle);
  }


  getDataFromQueryPatameter(){
    this.activateRoute.queryParams.subscribe(data=>{
      data=data?.data?JSON.parse(this.coreUtil.getBase64Decoded(data?.data)):data;
      this.templateConfig ={};
      if(data?.pageName){
        this.breadComeTitle=data.pageName;
        this.templateConfig.templateName=data.pageName;
       }
       if(data?.title){
        this.breadComeTitle=data.title;
       }
       if(data?.pageData){
        this.pageContext=JSON.parse(data?.pageData?this.coreUtil.getBase64Decoded(data?.pageData):'[]');
       }
       this.loadComponent();
  });
  }


  initPageInfo(){
     this.navigationInfo= [
      {
        title: this.breadComeTitle?this.translate.transform(this.breadComeTitle):this.translate.transform('Superapp_HOME_TEXT'),
        route: 'superapp/superapp-home/home',
        queryParam:{pageName:this.templateConfig?.templateName,templateName:this.templateConfig?.templateName,title:this.breadComeTitle},
        pageName:this.templateConfig?.templateName
      }
    ];
    this.pageInfo['navigation']=this.navigationInfo;
  }


  loadComponent() {
    this.updatePageInfoMenu();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(PreviewPageBuilderComponent);
    const viewContainerRef = this.appPageDirective.viewContainerRef;
    viewContainerRef.detach();
    viewContainerRef.clear();
     this.componentRef = viewContainerRef.createComponent<PreviewPageBuilderComponent>(componentFactory);
     this.componentRef.instance.previewConfig = this.templateConfig;   
     this.componentRef.instance.breadComeTitle = this.breadComeTitle;    
     this.componentRef.instance.pageContext = this.pageContext;    
  this.componentRef.instance.navigationInfo = this.navigationInfo;    
  this.componentRef.instance.currentUiOrder = 2;    
  this.componentRef.changeDetectorRef.detectChanges();

  }

  updatePageInfoMenu(){
    this.initPageInfo();
    if(this.hasValue.transform(this.navigationInfo)){
      this.coreUtil.getEventBus().emit({type: 'BREADCRUMB',data:this.pageInfo});
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
        this.componentRef.destroy();
    }
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
}

}
