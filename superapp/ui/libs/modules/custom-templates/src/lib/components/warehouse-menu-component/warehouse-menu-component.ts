import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';


@Component({
  selector: 'warehouse-menu-component',
  templateUrl: './warehouse-menu-component.html',
  styleUrls: ['./warehouse-menu-component.scss']
})
export class WarehouseMenuComponent implements OnInit {
@Input() customEventHandler;
baseConfigKey=CustomTemplateConstant.WAREHOUSE_MANAGEMENT_CONFIG_DASHBOARD;

  ngOnInit(): void {
  }
}
