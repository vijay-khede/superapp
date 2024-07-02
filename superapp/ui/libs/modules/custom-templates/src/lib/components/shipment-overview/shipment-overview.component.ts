import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';

@Component({
  selector: 'crm-shipment-overview',
  templateUrl: './shipment-overview.component.html',
  styleUrls: ['./shipment-overview.component.scss']
})
export class ShipmentOverviewComponent implements OnInit {
  @Input() pageContext;
  appName=CustomTemplateConstant.APP_NAME;

  ngOnInit(): void {
  }

}
