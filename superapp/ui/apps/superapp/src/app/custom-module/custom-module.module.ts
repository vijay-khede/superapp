import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { WorkorderDashboardComponent } from './workorder-dashboard/workorder-dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProgramDashboardComponent } from './program-dashboard/program-dashboard.component'
import { WorkOrderEntitiesModule } from '@enttribe/modules-workorder-entity-work-order-entities';
import { TaskWorkorderEntityModule } from '@enttribe/modules-workorder-entity-task-workorder-entity'
import {  ProgramManagementModule } from '@enttribe/modules-program-entity-program-management';
import { WorkorderTemplateComponent } from './workorder-template/workorder-template.component'
import { ProjectTemplateEntityModule } from '@enttribe/modules-workorder-entity-project-template-entity';
import { WorkorderEntityAdminModule } from '@enttribe/modules-workorder-entity-workorder-entity-admin';
import { FormsComponent } from './forms/forms.component';
import { PageBuilderModule } from '@enttribe/modules-page-builder';
import {  ToolsCoreModule } from "@enttribe/core/tools";
import {  PipesModule } from "@enttribe/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { BICoreModule } from '@enttribe/modules-business-intelligence-core';
import { WidgetRendererModule } from '@enttribe/modules-business-intelligence-widget-renderer';
import { DashboardRenderModule } from '@enttribe/modules-business-intelligence-dashboard-render';
import { RepositoryModule } from '@enttribe/modules-business-intelligence-repository';

import { MaintenanceDashboardComponent } from './maintenance-dashboard/maintenance-dashboard.component'; 
import { ChartModule } from '@enttribe/core/chart';
import { CustomProgramDashboardComponent } from './custom-program-dashboard/custom-program-dashboard.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { AdminStatusMasterComponent } from './admin-status-master/admin-status-master.component';
import { DashboardPopUpWindowComponent } from './dashboard-pop-up-window/dashboard-pop-up-window.component';
import { AppCanDeactivateGuard, AuthorizationGuard } from '@enttribe/core/auth';
import { customModulePermissionConstant } from './Constant/custom-module-permission-constant';
import { LayoutModule } from '@enttribe/core/layout';
import { PageModule } from '@enttribe/core/tools/page';
import { ButtonModule } from '@enttribe/core/tools/button';
import { SearchBoxModule } from '@enttribe/core/tools/search-box';
import { SelectBoxModule } from '@enttribe/core/tools/select-box';
import { DatePickerModule, InputBoxModule } from '@enttribe/core/tools/input-box-and-date-picker';
import { DividerModule } from '@enttribe/core/tools/divider';
import { StepperModule } from '@enttribe/core/tools/stepper';
import { IconModule } from '@enttribe/core/tools/icon';
import { CheckBoxModule } from '@enttribe/core/tools/check-box';
import { TabsModule } from '@enttribe/core/tools/tabs';
import { GenericModalModule } from '@enttribe/core/tools/generic-modal';
import { CardModule } from '@enttribe/core/tools/card';
import { RadioModule } from '@enttribe/core/tools/radio';
import { ChipModule } from '@enttribe/core/tools/chip';
import { LoaderModule } from '@enttribe/core/tools/loader';
import { AutoCompleteModule } from '@enttribe/core/tools/auto-complete';
import { ProgressBarModule } from '@enttribe/core/tools';
import { UploadBoxModule } from '@enttribe/core/tools/upload-box';
import { TooltipModule } from '@enttribe/core/tools/tooltip';
import { LabelModule } from '@enttribe/core/tools/label';
import { ExpansionPanelModule } from '@enttribe/core/tools/expansion-panel';
import { WrapperModule } from '@enttribe/core/tools/wrapper';
import { MenuModule } from '@enttribe/core/tools/menu';
import { ToggleModule } from '@enttribe/core/tools/toggle';
import { SplitOutlineDropdownModule } from '@enttribe/core/tools/split-outline-dropdown';
import { ImageViewerModule } from '@enttribe/core/tools/image-viewer';
import { SliderModule } from '@enttribe/core/tools/slider';

const LIB_ROUTES : Routes = [
{
  canActivate: [AuthorizationGuard],
    data: {
      permissions: [customModulePermissionConstant.ROLE_FEAT_Superapp_CUSTOM_MODULE_canViewWorkOrderDashboard],
    },
    canDeactivate: [AppCanDeactivateGuard],
  path: 'workorder_dashboard',
  component:WorkorderDashboardComponent
},
{
  canActivate: [AuthorizationGuard],
    data: {
      permissions: [customModulePermissionConstant.ROLE_FEAT_Superapp_CUSTOM_MODULE_canViewMaintenanceWorkOrderDashboard],
    },
    canDeactivate: [AppCanDeactivateGuard],
  path: 'maintenance_workorder_dashboard',
  component:MaintenanceDashboardComponent
},
{
  canActivate: [AuthorizationGuard],
    data: {
      permissions: [customModulePermissionConstant.ROLE_FEAT_Superapp_CUSTOM_MODULE_canViewTaskList],
    },
    canDeactivate: [AppCanDeactivateGuard],
  path: 'task_list',
  component:TaskListComponent
},
{
  canActivate: [AuthorizationGuard],
    data: {
      permissions: [customModulePermissionConstant.ROLE_FEAT_Superapp_CUSTOM_MODULE_canViewTaskDashboard],
    },
    canDeactivate: [AppCanDeactivateGuard],
  path: 'task_dashboard',
  component:TaskDashboardComponent
},
{
  canActivate: [AuthorizationGuard],
    data: {
      permissions: [customModulePermissionConstant.ROLE_FEAT_Superapp_CUSTOM_MODULE_canViewDashboard],
    },
    canDeactivate: [AppCanDeactivateGuard],
  path: 'program_dashboard',
  component:CustomProgramDashboardComponent
},

{
  canActivate: [AuthorizationGuard],
    data: {
      permissions: [customModulePermissionConstant.ROLE_FEAT_Superapp_CUSTOM_MODULE_canViewProjectTemplate],
    },
  canDeactivate: [AppCanDeactivateGuard],
  path: 'project-template',
  component:WorkorderTemplateComponent
},
{
  canActivate: [AuthorizationGuard],
    data: {
      permissions: [customModulePermissionConstant.ROLE_FEAT_Superapp_CUSTOM_MODULE_canViewEntityStatusMaster],
    },
  canDeactivate: [AppCanDeactivateGuard],
  path: 'entity-status-master',
  component:AdminStatusMasterComponent
},
{
  canActivate: [AuthorizationGuard],
    data: {
      permissions: [customModulePermissionConstant.ROLE_FEAT_Superapp_CUSTOM_MODULE_canViewForms],
    },
  canDeactivate: [AppCanDeactivateGuard],
  path: 'forms',
  component:FormsComponent
},

{
  canActivate: [AuthorizationGuard],
    data: {
      permissions: [customModulePermissionConstant.ROLE_FEAT_Superapp_CUSTOM_MODULE_canViewMaintenanceWorkOrderDashboard],
    },
    canDeactivate: [AppCanDeactivateGuard],
  path: 'maintenance-dashboard',
  component: MaintenanceDashboardComponent
}

]

@NgModule({
imports: [
  ChartModule,
  MenuModule,
    CommonModule,
    LabelModule,
    PipesModule,
    RouterModule.forChild(LIB_ROUTES),
    StepperModule,
    ButtonModule,
    DividerModule,
    ToolsCoreModule,
    SelectBoxModule,
    RadioModule,
    InputBoxModule,
    CardModule,
    IconModule,
    PageModule,
    CardModule,
    IconModule,
    TooltipModule,
    ToggleModule,
    CheckBoxModule,
    UploadBoxModule,
    ProgressBarModule,
    TabsModule,
    GenericModalModule,
    ExpansionPanelModule,
    ChipModule,
    LoaderModule,
    SplitOutlineDropdownModule,
    ImageViewerModule,
    SliderModule,
    WrapperModule ,
    AutoCompleteModule,
    SearchBoxModule,
    DatePickerModule,
    ProjectTemplateEntityModule,
  WorkOrderEntitiesModule,
  TaskWorkorderEntityModule,
  ProgramManagementModule,
  ProjectTemplateEntityModule,
  PageBuilderModule,
  
  FlexLayoutModule,
  LayoutModule,
  BICoreModule,
  WidgetRendererModule,
  DashboardRenderModule,

 

  RepositoryModule,

 

  ChartModule,
  WorkorderEntityAdminModule,
],
declarations: [
  DashboardPopUpWindowComponent,
  WorkorderDashboardComponent,
  TaskListComponent,
  ProgramDashboardComponent,
  WorkorderTemplateComponent,
  FormsComponent,
  MaintenanceDashboardComponent,
  CustomProgramDashboardComponent,
  TaskDashboardComponent,
  AdminStatusMasterComponent
]
})
export class CustomModuleModule { }
