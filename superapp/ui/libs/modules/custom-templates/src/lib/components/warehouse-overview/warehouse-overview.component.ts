import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';

@Component({
  selector: 'app-warehouse-overview',
  templateUrl: './warehouse-overview.component.html',
  styleUrls: ['./warehouse-overview.component.scss']
})
export class WarehouseOverviewComponent implements OnInit {
  @Input()pageContext;
  appName=CustomTemplateConstant.APP_NAME;

  ngOnInit(): void {
  }


}
