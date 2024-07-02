import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { Environment } from '@enttribe/core';
import { environment } from './../../environments/environment';
export function EnvironmentInit(injector: Injector): Observable<string> {
  return new Observable((observer) => {
    Environment.envName = environment.name;
    Environment.retryCount = environment.retryCount;
    Environment.retryInterval = environment.retryInterval;
    Environment.labelPosition = environment.labelPosition;
    Environment.pageHeader = environment.pageHeader;
    Environment.myApps = environment.myApps;
    Environment.ownKeycloak = environment.ownKeycloak;
    observer.next('EnvironmentInit');
    observer.complete();
  });
}
