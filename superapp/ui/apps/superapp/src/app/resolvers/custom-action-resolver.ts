import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AppContextService, HttpService } from '@enttribe/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomActionResolver implements Resolve<any> {
  constructor(private appContext: AppContextService, private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return new Observable((obs) => {  
        const url = this.appContext.getContext("BPMNCONFIG") + `ApplicationEntityMapping/getActionByApplicationAndEntity?applicationName=SUPERAPP_APP_NAME&entityName=${route.data['entityName']}`;
        this.httpService.sendGETRequest(url).subscribe((res) => {
            obs.next(res || []);
            obs.complete();
        }, (err) => {
            obs.next([]);
            obs.complete();
        });
    })
  }
}
