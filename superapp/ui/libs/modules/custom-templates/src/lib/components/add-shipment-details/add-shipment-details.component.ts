import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';

@Component({
  selector: 'app-add-shipment-details',
  templateUrl: './add-shipment-details.component.html',
  styleUrls: ['./add-shipment-details.component.scss']
})
export class AddShipmentDetailsComponent implements OnInit {
  @Input() pageContext;
  appName=CustomTemplateConstant.APP_NAME;

  ngOnInit(): void {
  }
  

}
