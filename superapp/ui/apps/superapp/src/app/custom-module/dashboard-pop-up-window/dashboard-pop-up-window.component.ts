import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HasValuePipe } from '@enttribe/core';

@Component({
  selector: 'app-dashboard-pop-up-window',
  templateUrl: './dashboard-pop-up-window.component.html',
  styleUrls: ['./dashboard-pop-up-window.component.scss']
})
export class DashboardPopUpWindowComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<DashboardPopUpWindowComponent>,

   
    
   public hasvalue: HasValuePipe,
    
   @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
 console.log("data of chart ",this.data);
  }
  ngAfterViewInit(){

  }

}
