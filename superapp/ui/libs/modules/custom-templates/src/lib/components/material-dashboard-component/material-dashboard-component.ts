import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';
@Component({
  selector: 'material-menu-component',
  templateUrl: './material-dashboard-component.html',
  styleUrls: ['./material-dashboard-component.scss']
})
export class MaterialDashboardComponent implements OnInit {
  @Input() customEventHandler:any;
  baseConfigKey=CustomTemplateConstant.MATERIAL_MANAGEMENT_CONFIG_DASHBOARD;

  ngOnInit(): void {
  }

}