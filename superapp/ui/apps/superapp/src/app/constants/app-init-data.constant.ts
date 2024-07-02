import { environment } from './../../environments/environment';
// tslint:disable-next-line: nx-enforce-module-boundaries
import {
  IAppInitData,
  IEnvironment,
  MicroAppCoreUtilService,
} from '@enttribe/core';
import { Injector } from '@angular/core';

export function appInitUrl(injector: Injector): IAppInitData {
  let coreUtilService: any;
  if (environment.name === 'micro-app' || environment.name === 'mtest') {
    coreUtilService = injector.get(MicroAppCoreUtilService);
  }
  const appInitData: IAppInitData = {
    keycloakContextUrl: './assets/idm.json',
    contextURL:
      environment.name === 'micro-app'
        ? coreUtilService.getAssetUrl('data/app-context.json')
        : environment.name === 'mtest'
        ? coreUtilService.getAssetUrl('data/app-context.test.json')
        : environment.name === 'test'
        ? './assets/mock-api/app-context.test.json'
        : './assets/data/app-context.json',
    userContextURL:
      environment.name === 'micro-app' || environment.name === 'mtest'
        ? coreUtilService.getAssetUrl('/data/user.json')
        : './assets/data/user.json',
    userPreferencesURL:
      environment.name === 'micro-app' || environment.name === 'mtest'
        ? coreUtilService.getAssetUrl('/data/user-prefrence.json')
        : './assets/data/user-prefrence.json',
    systemConfigURL:
      environment.name === 'micro-app' || environment.name === 'mtest'
        ? coreUtilService.getAssetUrl('/data/system-config.json')
        : './assets/data/system-config.json',
    apiMapURL:
      environment.name === 'test' || environment.name === 'mtest'
        ? './assets/mock-api/api-map.json'
        : '',
  };
  return appInitData;
}

export const environmentData: IEnvironment = {
  retryInterval: environment.name === 'test' ? 2000 : 5000,
  retryCount: environment.name === 'test' ? 1 : 3,
  name: environment.name,
  labelPosition: environment.labelPosition,
} as IEnvironment;
