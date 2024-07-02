import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';
// import { CardConfig } from '../dashboard/dashboard.component';

@Component({
  selector: 'procurement-menu-component',
  templateUrl: './procurement-menu-component.html',
  styleUrls: ['./procurement-menu-component.scss']
})
export class PROCUREMENTMenuComponent implements OnInit {
  @Input() customEventHandler:any;
  baseConfigKey=CustomTemplateConstant.PROCUREMENT_CONFIG_DASHBOARD;
  ngOnInit(): void {
  }

}
