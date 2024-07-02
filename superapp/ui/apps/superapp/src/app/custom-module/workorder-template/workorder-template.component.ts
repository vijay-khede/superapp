import { Component, OnInit } from '@angular/core';
import { CoreUtilService, HasValuePipe } from '@enttribe/core';
import { SnackbarService } from '@enttribe/core/tools/snackbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wo-workorder-template',
  templateUrl: './workorder-template.component.html',
  styleUrls: ['./workorder-template.component.scss']
})
export class WorkorderTemplateComponent implements OnInit {
  
  appName:string='Superapp_APP_NAME';
  basePath='superapp/superapp-custom-module';

  
  constructor( ) { }
  
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
