import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';

@Component({
  selector: 'material-vendor-overview',
  templateUrl: './material-vendor-overview.component.html',
  styleUrls: ['./material-vendor-overview.component.scss']
})
export class MaterialVendorOverviewComponent implements OnInit {
  @Input() pageContext:any;
  appName=CustomTemplateConstant.APP_NAME;

  ngOnInit(): void {
  }
}
