import { Injector } from '@angular/core';
import { forkJoin, of, Observable } from 'rxjs';
import { concatAll } from 'rxjs/operators';
// tslint:disable-next-line: nx-enforce-module-boundaries
import {
  AppContextService,
  HttpService,
  IAppInitData,
  ApiMapTestService,
  ModuleService,
  SystemConfigService,
  singleSpaPropsSubject,
  ApiMapInit,
  CoreUtilService,
  RouterConfigService,
  KeycloakContextInit,
  KeycloakInit
} from '@enttribe/core';
import {
  UserService,
  UserPreferenceService,
  IAppData,
} from '@enttribe/core/user';
import { LanguageService } from '@enttribe/core/tools';
import { GlobalSettingInit } from '@enttribe/core/global-setting';
import { EnvironmentInit } from './environment.init';
import { environment } from '../../environments/environment';

export function MicroAppInit(
  injector: Injector,
  httpService: HttpService,
  appContextService: AppContextService,
  appInitData: IAppInitData,
  apiMapTestService: ApiMapTestService
) {
  return () => {
    return new Promise((resolve, reject) => {
      singleSpaPropsSubject.subscribe((props: any) => {
        const appData: IAppData = props.appData;
        const coreUtilService = injector.get(CoreUtilService);
        coreUtilService.setEventBus(props.EventBus);
        const $0 = forkJoin([EnvironmentInit(injector)]);
        const $1 = forkJoin([
          KeycloakContextInit(injector, httpService, appInitData),
        ]);
        const $2 = forkJoin([KeycloakInit(injector)]);
        appContextService.setAppContext(appData.applicationContext);
        const moduleService = injector.get(ModuleService);
        moduleService.setModulesList(appData.module);
        moduleService.setEmbededIframeRoutes(appData.iframeRoute);
        moduleService.setCurrentModule(appData.currentModule);
        const systemConfigService = injector.get(SystemConfigService);
        systemConfigService.setSyConfigs(appData.systemConfig);
        const userService = injector.get(UserService);
        userService.setUserDetails(appData.user);
        const userPreferenceService = injector.get(UserPreferenceService);
        userPreferenceService.setUserPreferences(appData.userPreferences);
        const $3 = forkJoin([
          GlobalSettingInit(injector),
          // CustomLegendInit(injector),
        ]);
        const languageService = injector.get(LanguageService);
        languageService.setLanguageDictionary(appData.language);
        const $6 = forkJoin([
          ApiMapInit(apiMapTestService, httpService, appInitData),
        ]);
        const sequence: Array<Observable<any>> = [$0];
        if (environment.name === 'mtest') {
          sequence.push($6);
        }
        if (environment.ownKeycloak) {
          sequence.push($1);
          sequence.push($2);
        }
        sequence.push($3);
        of(...sequence)
          .pipe(concatAll())
          .subscribe(
            (next) => {},
            (err) => {},
            () => {
              const routerConfig = injector.get(RouterConfigService);
              routerConfig.resetRouterWithIframeConfig();
              (window as any).CKEDITOR_VERSION = null;
              resolve(true);
            }
          );
      });
    });
  };
}
