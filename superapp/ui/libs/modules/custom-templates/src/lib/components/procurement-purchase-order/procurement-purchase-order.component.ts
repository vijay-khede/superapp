import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';

@Component({
  selector: 'crm-procurement-purchase-order',
  templateUrl: './procurement-purchase-order.component.html',
  styleUrls: ['./procurement-purchase-order.component.scss']
})
export class ProcurementPurchaseOrderComponent implements OnInit {
  @Input() pageContext;
  appName=CustomTemplateConstant.APP_NAME;

  ngOnInit(): void {
  }
}
