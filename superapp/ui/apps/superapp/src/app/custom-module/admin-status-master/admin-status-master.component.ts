import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wo-admin-status-master',
  templateUrl: './admin-status-master.component.html',
  styleUrls: ['./admin-status-master.component.scss']
})
export class AdminStatusMasterComponent implements OnInit {

statusTitle="STATUS_MASTER";
appName:string='Superapp_APP_NAME';
basePath='superapp/superapp-custom-module';

  constructor() { }

  ngOnInit(): void {
  }

}
