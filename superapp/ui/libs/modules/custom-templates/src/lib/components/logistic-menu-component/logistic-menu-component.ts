import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';


@Component({
  selector: 'logistic-menu-component',
  templateUrl: './logistic-menu-component.html',
  styleUrls: ['./logistic-menu-component.scss']
})
export class LogisticMenuComponent implements OnInit {
 @Input() customEventHandler:any;
 baseConfigKey=CustomTemplateConstant.LOGISTICS_CONFIG_DASHBOARD;

  ngOnInit(): void {
  }
 
}
