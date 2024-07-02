import { Injector } from '@angular/core';
// tslint:disable-next-line: nx-enforce-module-boundaries
import {
  AppContextService,
  HttpService,
  IAppInitData,
  AppContextInit,
  SystemConfigInit,
  ApiMapTestService,
  ApiMapInit,
  KeycloakInit,
  KeycloakContextInit,
  ThemeInit,
} from '@enttribe/core';
import { forkJoin, of, Observable } from 'rxjs';
import { concatAll } from 'rxjs/operators';
import { UserInit, UserPrefrenceInit } from '@enttribe/core/user';
import { LanguageInit } from '@enttribe/core/tools';
import {  ModuleInit } from '@enttribe/core/tools/sidenav';
import { GlobalSettingInit } from '@enttribe/core/global-setting';
import { EnvironmentInit } from './environment.init';
import { environment } from '../../environments/environment';
import { CustomLegendInit } from '@enttribe/core/custom-legend';
import { DOCUMENT } from '@angular/common';

export function AppInit(
  injector: Injector,
  httpService: HttpService,
  appContextService: AppContextService,
  appInitData: IAppInitData,
  apiMapTestService: ApiMapTestService
) {
  return () => {
    return new Promise((resolve, reject) => {
      const angularDocument = injector.get(DOCUMENT);
      const $first = forkJoin([
        EnvironmentInit(injector),
        KeycloakContextInit(injector, httpService, appInitData),
      ]);
      const $0 = forkJoin([KeycloakInit(injector)]);
      const $1 = forkJoin([
        AppContextInit(appContextService, httpService, appInitData, injector),
      ]);
      const $2 = forkJoin([
        ModuleInit(httpService, injector),
        SystemConfigInit(httpService, appContextService, injector),
        UserInit(httpService, appContextService, injector, appInitData),
        UserPrefrenceInit(
          httpService,
          appContextService,
          injector,
          appInitData
        ),
      ]);
      const $3 = forkJoin([
        ThemeInit(injector),
        GlobalSettingInit(injector),
        CustomLegendInit(injector),
      ]);
      const $4 = forkJoin([LanguageInit(injector)]);
      // const $5 = forkJoin([HermesInit(injector)]);
      const $6 = forkJoin([
        ApiMapInit(apiMapTestService, httpService, appInitData),
      ]);
      const sequence: Array<Observable<any>> = [$first];
      if (environment.name !== 'test') {
        sequence.push($0);
      }
      sequence.push($1);
      if (environment.name === 'test') {
        sequence.push($6);
      }
      sequence.push($2);
      sequence.push($3);
      sequence.push($4);
      // sequence.push($5);
      of(...sequence)
        .pipe(concatAll())
        .subscribe(
          (next) => {},
          (err) => {
            angularDocument.getElementById('errorMsgElement').style.display =
              'block';
            angularDocument.getElementById('loadingElement').style.display =
              'none';
          },
          () => {
            angularDocument.getElementById('errorMsgElement').style.display =
              'none';
            angularDocument.getElementById('loadingElement').style.display =
              'none';

            (window as any).CKEDITOR_VERSION = null;
            resolve(true);
          }
        );
    });
  };
}
