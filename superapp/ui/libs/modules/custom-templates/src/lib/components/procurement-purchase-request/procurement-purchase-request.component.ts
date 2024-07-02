import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';
@Component({
  selector: 'crm-procurement-purchase-request',
  templateUrl: './procurement-purchase-request.component.html',
  styleUrls: ['./procurement-purchase-request.component.scss']
})
export class ProcurementPurchaseRequestComponent implements OnInit {
  ngOnInit(): void {
  }
  appName=CustomTemplateConstant.APP_NAME;
  @Input() pageContext;
}
