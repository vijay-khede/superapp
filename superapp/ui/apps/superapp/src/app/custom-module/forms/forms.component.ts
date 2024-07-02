import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreUtilService, AssetUrlPathPipe, HasValuePipe } from '@enttribe/core';
import { TranslatePipe } from '@enttribe/core/tools';

@Component({
  selector: 'wo-forms.component',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  appName:string='Superapp_APP_NAME';
  basePath='superapp/superapp-custom-module';


  pageActions = [];
  eventBus: any;
  pageInfo: any={} ;
  formCountData: any =[];
  questionBankCountData:any = [];
  getDictionaryCountData:any = [];
  geCatalogueCountData:any = [];
  desiredStatuses = ['Draft', 'In Use', 'Published', 'Obsoleted'];
  groups:any= [
        {
          name: this.translate.transform('VB_VIEWS_TEXT_MODULE_NAME'),
          icon: 'page-builder',
          otherLib: true,
          color: '#6ce0c6',
          url: '../../ui-designer/views',
          description: this.translate.transform('VIEW_BUILDER_DESCRIPTION'),
          bgClassName: 'bg-1',
          pointsTemplate:'view',
          menuList: [
                    {
                      displayName:this.translate.transform('CREATE_AND_LIST'),
                      icon:'List-View$fontset$icomoon',
                      value:'list',
                      url: '../../ui-designer/views'
                    }
                    ],
          points:[
            {
              STATUS : 'Drafts',
              color: '#c5d3d4',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'Published',
              color: '#00cab3',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'In used',
              color: '#5cb97f',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'Obsolete',
              color: '#f2998e',
              STATUS_COUNT: 0
            }
          ]
        },
        {
          name: this.translate.transform('CHECKLIST_TEMPLATE'),
          icon: 'Dependent-Picklist',
          color: '#7b9cf6',
          otherLib: true,
          url: '../../ui-designer/checklist-template',
          description:this.translate.transform('CHECKLIST_DESCRIPTION'),
          bgClassName: 'bg-2',
          pointsTemplate:'checklist',
          menuList: [
            {
              displayName:this.translate.transform('CREATE_AND_LIST'),
              icon:'List-View$fontset$icomoon',
              value:'list',
              url: '../../ui-designer/checklist-template'
            }
            ],
          points:[
            {
              STATUS : 'Drafts',
              color: '#c5d3d4',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'Published',
              color: '#00cab3',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'In used',
              color: '#5cb97f',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'Obsolete',
              color: '#f2998e',
              STATUS_COUNT: 0
            }
          ]

        },
        {
          name: this.translate.transform('TEST_CASE_BUILDER_MODULE_NAME'),
          color: '#ffc86a',
          icon: 'question',
          otherLib: true,
          url: '../../ui-designer/test-case',
          description:this.translate.transform('TEST_CASE_DESCRIPTION'),
          bgClassName: 'bg-3',
          pointsTemplate:'test',
          menuList: [
            {
              displayName:this.translate.transform('CREATE_AND_LIST'),
              icon:'List-View$fontset$icomoon',
              value:'list',
              url:'../../ui-designer/test-case' 
            }
            ],
          points:[
            {
              STATUS : 'Site design and construction',
              color: '#e14a84',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'QA',
              color: '#267ff3',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'Maintenance of EV Charging station',
              color: '#ca5954',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'new',
              color: '#99cdec',
              STATUS_COUNT: 0
            }
          ]

        },
        {
          name: this.translate.transform('Dictionary'),
          icon: 'List-Outline',
          color: '#b998fc',
          otherLib: true,
          url: '../../ui-designer/master-value',
          description: this.translate.transform('DICTIONARY_DESCRIPTION'),
          bgClassName: 'bg-4',
          pointsTemplate:'master',
          menuList: [
            {
              displayName:this.translate.transform('CREATE_AND_LIST'),
              icon:'List-View$fontset$icomoon',
              value:'list',
              url:'../../ui-designer/master-value'
            }
            ],
          points:[
            {
              STATUS : 'STATIC',
              color: '#99cdec',
              STATUS_COUNT: 0
            },
            {
              STATUS : 'DYNAMIC',
              color: '#df4e58',
              STATUS_COUNT : 0
            }
          ]
        }
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coreUtil: CoreUtilService,
    private translate: TranslatePipe,
    private hasValue: HasValuePipe,
  ) {
    this.pageInfo=this.initPageInfo();

   }

   initPageInfo(){
    let pageInfo = {    name: this.translate.transform('FORMS'),
    navigation: [
      {
        title: this.translate.transform('FORMS'),
        route: '/superapp/custom-module/forms',
      }
    ],
    searchMenu: [],
  };
  return pageInfo;  
}
  actionPage(data) {
    this.coreUtil.buttonAction(data);
  }
  ngOnInit(): void {
    console.log(this.groups)
  }


  goToAdminSection(item) {
    localStorage.setItem('parentRoute','console/console-workspace');
    const obj={
      loadingType:'external',
      applicationName:this.appName
    }
    this.router.navigate(['../' + item.url], {
      relativeTo: this.route,
      queryParams:{data:this.coreUtil.getBase64Encoded(JSON.stringify(obj))}
    });
  }

  getCounts(id){
    if(id=0){

    }
  }
  viewStatusCount:any={};
 
  getChecklistCounts(){

  }
  getTestCaseCounts(){

  }
  getMasterValueCounts(){

  }
  navigateLink(event)
  { 
  if (event.value==='list'|| this.hasValue.transform(event.url))
  {
     this.goToAdminSection(event);
  }
}

}