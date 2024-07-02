import { APP_INITIALIZER, ErrorHandler, Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { environment } from "../environments/environment";
import { APP_BASE_HREF, DecimalPipe, PlatformLocation } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiMapTestService, AppContextService, APP_CONTEXT_NAME, APP_INIT_DATA, APP_MOUNT_STATUS, ErrorRouterService, ErrorService, GlobalErrorHandler, HttpInterceptorService, HttpNgswInterceptorService, HttpRetryService, HttpService, HttpTestServiceInterceptor, MicroAppHttpInterceptorService, MICRO_APP_NAME } from "@enttribe/core";
import { FullscreenOverlayContainer, OverlayContainer } from "@angular/cdk/overlay";
import {
  AuthenticationGuard,
  AuthorizationGuard,
  FakeAuthenticationGuard,
  AppCanDeactivateGuard,
  MicroAppAuthenticationGuard,
} from '@enttribe/core/auth';
import { appInitUrl } from './constants/app-init-data.constant';
import { AppInit } from './initializers/app.init';
import { MicroAppInit } from './initializers/micro.app.init';
import { AppTemplateModule } from "@enttribe/template-app-template12";
import { KeycloakAngularModule } from "keycloak-angular";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorRouterHandlerInterceptor, GxErrorComponent, HttpErrorHandlerInterceptor } from "@enttribe/core/tools/gx-error";
import { SnackbarModule, SnackbarService } from "@enttribe/core/tools/snackbar";
import { TranslatePipe } from "@enttribe/core/tools";
import { APP_ROUTING } from './app.routing.const';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
let appRoute = [];
if (environment.name !== 'micro-app' && environment.name !== 'mtest') {
  appRoute = [
    {
      path: 'access-denied',
      component: GxErrorComponent,
      data: { error: 'access-denied' },
    },
    {
      path: 'user-privileges',
      component: GxErrorComponent,
      data: { error: 'user-privileges' },
    },
    {
      path: 'page-not-found',
      component: GxErrorComponent,
      data: { error: 'page-not-found' },
    },
    {
      path: 'service-unavailable',
      component: GxErrorComponent,
      data: { error: 'service-unavailable' },
    },
  ];

} else {
  appRoute.push({
    path: '**',
    component: GxErrorComponent,
    data: { error: 'service-unavailable' },
  });
}

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    MatDialogModule,
    AppTemplateModule,
    SnackbarModule,
    MatDialogModule,
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
      provide: APP_CONTEXT_NAME,
      useValue: ['demo-context'],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorRouterHandlerInterceptor,
      multi: true,
      deps: [ErrorRouterService],
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
      useFactory:
        environment.name === 'micro-app' || environment.name === 'mtest'
          ? MicroAppInit
          : AppInit,
      deps: [
        Injector,
        HttpService,
        AppContextService,
        APP_INIT_DATA,
        ApiMapTestService,
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
    AuthorizationGuard,
    AppCanDeactivateGuard,
    TranslatePipe,
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
