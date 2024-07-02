import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';

@Component({
  selector: 'custom-all-warehouses',
  templateUrl: './all-warehouses.component.html',
  styleUrls: ['./all-warehouses.component.scss']
})
export class AllWarehousesComponent implements OnInit {
  @Input() customEventHandler;
  baseConfigKey=CustomTemplateConstant.WAREHOUSE_CONFIG_KEY;
  bageConfigSingleWarehouse=CustomTemplateConstant.WAREHOUSE_CONFIG_DASHBOARD;

  
  ngOnInit(): void {
  }

}
