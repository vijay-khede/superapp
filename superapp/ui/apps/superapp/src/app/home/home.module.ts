import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home.component';
import { PageModule } from '@enttribe/core/tools/page';
import { FlexModule } from '@angular/flex-layout';
import { CoreModule } from '@enttribe/core';
import { PageBuilderModule } from '@enttribe/modules-page-builder';
import { AppPageDirective } from './app-page.directive';

const ROUTES : Routes = [
      {
        path: 'home',
        component: HomeComponent
      }
       ];

@NgModule({
  declarations: [HomeComponent,AppPageDirective],
  entryComponents:[HomeComponent],
  imports: [
    PageBuilderModule,
    CoreModule,
      CommonModule,
      PageModule,
      FlexModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class HomeModule { }
