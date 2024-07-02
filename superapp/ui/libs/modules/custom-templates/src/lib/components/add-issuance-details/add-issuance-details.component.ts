import { Component, Input, OnInit } from '@angular/core';
import { CustomTemplateConstant } from '../custom-template.constants';



@Component({
  selector: 'app-add-issuance-details',
  templateUrl: './add-issuance-details.component.html',
  styleUrls: ['./add-issuance-details.component.scss']
})
export class AddIssuanceDetailsComponent implements OnInit {
  @Input() pageContext;
  appName=CustomTemplateConstant.APP_NAME;
  ngOnInit(): void {
  }
}
