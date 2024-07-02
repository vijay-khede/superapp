import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';

@Component({
  selector: 'warehouse-planning',
  templateUrl: './warehouse-planning.component.html',
  styleUrls: ['./warehouse-planning.component.scss']
})
export class WarehousePlanning implements OnInit {
@Input() customEventHandler:any;
@Input() pageContext;
baseConfigKey=CustomTemplateConstant.WAREHOUSE_PLANNING_CONFIG;

  constructor() { }

  ngOnInit(): void {
  }

}
