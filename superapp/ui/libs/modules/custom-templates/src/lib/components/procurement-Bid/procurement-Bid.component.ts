import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';

@Component({
  selector: 'crm-procurement-Bid',
  templateUrl: './procurement-Bid.component.html',
  styleUrls: ['./procurement-Bid.component.scss']
})
export class ProcurementBidComponent implements OnInit {
  @Input() pageContext;
  appName=CustomTemplateConstant.APP_NAME;

  ngOnInit(): void {
    
  }

}
