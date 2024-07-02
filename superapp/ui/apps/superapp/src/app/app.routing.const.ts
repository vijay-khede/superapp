import { ResetCKEditorResolver } from './home/reset-ckeditor.resolver';
import { GoogleMapResolver } from '@enttribe/core';
import { SystemConfigResolver } from '@enttribe/core';
import { Route } from '@angular/router';
import {  LanguageResolver } from '@enttribe/core/tools';
import { GxErrorComponent } from '@enttribe/core/tools/gx-error';
import { CustomActionResolver } from './resolvers/custom-action-resolver';



const APP_ROUTING_CHILDREN : Array<any> = [];
APP_ROUTING_CHILDREN.push({
  path: 'superapp-home',
  loadChildren: () =>
    import('./home/home.module').then(
      (m) => m.HomeModule
    ),
  resolve: {
    resetCkEditor: ResetCKEditorResolver,
  }
},
 {
      path: 'custom-templates',
      loadChildren: () =>
      import('@enttribe/modules-custom-templates').then(
        (m) => m.CustomTemplatesModule
      )
    },
{
path: 'superapp-custom-module',
loadChildren: () =>
  import('./custom-module/custom-module.module').then(
    (m) => m.CustomModuleModule
  )
})

APP_ROUTING_CHILDREN.push({
  path: '**',
  component: GxErrorComponent,
  data: { error: 'page-not-found' },
});

export const APP_ROUTING: Route = {
  path: 'superapp',
  resolve: {
    language: LanguageResolver,
     google: GoogleMapResolver,
    systemconfig: SystemConfigResolver,
  },
  data: {
    appName: ['SUPERAPP_APP_NAME'],
  },
  children: APP_ROUTING_CHILDREN
};
