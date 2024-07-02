import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';
import { MicroAppModule } from './app/micro-app.module';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { singleSpaPropsSubject } from '@enttribe/core';
import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from 'single-spa-angular';
import { environment } from './environments/environment';
import { setPublicPath } from 'systemjs-webpack-interop';

setPublicPath('superapp');
if (environment.production) {
  enableProdMode();
}
const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      MicroAppModule
    );
  },
  template: '<superapp-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
