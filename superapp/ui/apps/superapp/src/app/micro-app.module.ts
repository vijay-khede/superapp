import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  APP_INITIALIZER,
  Injector,
  NgModule,
  ErrorHandler,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  RouterModule,
  Router,
  ActivatedRoute,
  RouteReuseStrategy,
} from '@angular/router';
import { MicroAppInit } from './initializers/micro.app.init';
import { environment } from '../environments/environment';
import {
  AppContextService,
  APP_INIT_DATA,
  HttpInterceptorService,
  HttpService,
  GlobalErrorHandler,
  HttpNgswInterceptorService,
  HttpRetryService,
  ApiMapTestService,
  MICRO_APP_NAME,
  MicroAppHttpInterceptorService,
  ErrorService,
  APP_MOUNT_STATUS,
  CustomRouteReuseStrategy,
  HttpTestServiceInterceptor,
  APP_TEMPLATE_TYPE,
  TemplateType,
  CoreModule,
} from '@enttribe/core';
import {
  AuthenticationGuard,
  AuthorizationGuard,
  FakeAuthenticationGuard,
  AppCanDeactivateGuard,
  MicroAppAuthenticationGuard,
} from '@enttribe/core/auth';
import {
  TranslatePipe,
} from '@enttribe/core/tools';
import { KeycloakAngularModule } from 'keycloak-angular';
import { MicroAppComponent } from './micro-app.component';
import { appInitUrl } from './constants/app-init-data.constant';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  OverlayContainer,
  FullscreenOverlayContainer,
} from '@angular/cdk/overlay';
import { APP_BASE_HREF, DecimalPipe, PlatformLocation } from '@angular/common';
import { CustomLegendModule } from '@enttribe/core/custom-legend';
import { SnackbarModule, SnackbarService } from '@enttribe/core/tools/snackbar';
import { GxErrorComponent,HttpErrorHandlerInterceptor } from '@enttribe/core/tools/gx-error';
import {  APP_ROUTING } from './app.routing.const';

let appRoute = [
  {
    path: '**',
    component: GxErrorComponent,
    data: { error: 'service-unavailable' },
  },
];

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
  declarations: [MicroAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    MatDialogModule,
    SnackbarModule,
    MatDialogModule,
    CoreModule,
    CustomLegendModule,
    RouterModule.forRoot([APP_ROUTING, ...appRoute]),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation],
    },
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    {
      provide: MICRO_APP_NAME,
      useValue: 'superapp',
    },
    {
      provide: APP_MOUNT_STATUS,
      useValue: false,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true,
      deps: [SnackbarService, ErrorService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:
        environment.name === 'micro-app' && !environment.ownKeycloak
          ? MicroAppHttpInterceptorService
          : environment.name === 'test'
          ? HttpTestServiceInterceptor
          : HttpInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpNgswInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRetryService,
      multi: true,
    },
    {
      provide: APP_INIT_DATA,
      useFactory: appInitUrl,
      deps: [Injector],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: MicroAppInit,
      deps: [
        Injector,
        HttpService,
        AppContextService,
        APP_INIT_DATA,
        ApiMapTestService,
        Router,
        ActivatedRoute,
      ],
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    { provide: Window, useValue: window },
    {
      provide: AuthenticationGuard,
      useClass:
        environment.name === 'micro-app' && !environment.ownKeycloak
          ? MicroAppAuthenticationGuard
          : environment.name === 'test' || environment.name === 'mtest'
          ? FakeAuthenticationGuard
          : AuthenticationGuard,
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
    {
      provide: APP_TEMPLATE_TYPE,
      useValue: TemplateType.TEMPLATE4,
    },
    AuthorizationGuard,
    AppCanDeactivateGuard,
    TranslatePipe,
    DecimalPipe,
  ],
  bootstrap: [MicroAppComponent],
})
export class MicroAppModule {}
