import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule, PipesModule } from '@enttribe/core';
import { ChartModule } from '@enttribe/core/chart';
import { LayoutModule } from '@enttribe/core/layout';
import { ToolsCoreModule } from "@enttribe/core/tools";
import { AutoCompleteModule } from '@enttribe/core/tools/auto-complete';
import { ButtonModule } from '@enttribe/core/tools/button';
import { DividerModule } from '@enttribe/core/tools/divider';
import { ExpansionPanelModule } from '@enttribe/core/tools/expansion-panel';
import { GenericModalModule } from '@enttribe/core/tools/generic-modal';
import { IconModule } from '@enttribe/core/tools/icon';
import { ImageModule } from '@enttribe/core/tools/image';
import { ImageViewerModule } from '@enttribe/core/tools/image-viewer';
import { DatePickerModule, InputBoxModule } from '@enttribe/core/tools/input-box-and-date-picker';
import { LabelModule } from '@enttribe/core/tools/label';
import { PageModule } from '@enttribe/core/tools/page';
import { RatingStarModule } from "@enttribe/core/tools/rating-star";
import { SelectBoxModule } from '@enttribe/core/tools/select-box';
import { SliderModule } from '@enttribe/core/tools/slider';
import { ToggleModule } from '@enttribe/core/tools/toggle';
import { TooltipModule } from '@enttribe/core/tools/tooltip';
import { InventoryLogisticsManagementModule } from '@enttribe/modules-inventory-logistics-management';
import { InventoryMaterialManagementModule } from '@enttribe/modules-inventory-material-management';
import { InventoryProcurementManagementModule } from '@enttribe/modules-inventory-procurement-management';
import { InventoryWarehouseManagementModule } from '@enttribe/modules-inventory-warehouse-management';
import { AddIssuanceDetailsComponent } from './components/add-issuance-details/add-issuance-details.component';
import { AddShipmentDetailsComponent } from './components/add-shipment-details/add-shipment-details.component';
import { AllWarehousesComponent } from './components/all-warehouses/all-warehouses.component';
import { LogisticMenuComponent } from './components/logistic-menu-component/logistic-menu-component';
import { MaterialDashboardComponent } from './components/material-dashboard-component/material-dashboard-component';
import { MaterialVendorOverviewComponent } from './components/material-vendor-overview/material-vendor-overview.component';
import { ProcurementBidComponent } from './components/procurement-Bid/procurement-Bid.component';
import { PROCUREMENTMenuComponent } from './components/procurement-menu-component/procurement-menu-component';
import { ProcurementPurchaseOrderComponent } from './components/procurement-purchase-order/procurement-purchase-order.component';
import { ProcurementPurchaseRequestComponent } from './components/procurement-purchase-request/procurement-purchase-request.component';
import { ShipmentOverviewComponent } from './components/shipment-overview/shipment-overview.component';
import { WarehouseMenuComponent } from './components/warehouse-menu-component/warehouse-menu-component';
import { WarehouseOverviewComponent } from './components/warehouse-overview/warehouse-overview.component';
import { WarehousePlanning } from './components/warehouse-planning/warehouse-planning.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const ROUTES:Routes =[{
  path:'material',   
  component:MaterialDashboardComponent
}
];        
        @NgModule({
          imports: [
            CommonModule,
            RouterModule,
            CoreModule,
            IconModule,
            GenericModalModule,
              DividerModule,
              ButtonModule,
              LayoutModule,
              SelectBoxModule,
              PipesModule,
              ChartModule,
              ToolsCoreModule,
              PageModule,
              FlexModule,
              GenericModalModule,
              ExpansionPanelModule,
              AutoCompleteModule,
              RatingStarModule,
              RouterModule.forChild(ROUTES),
              ChartModule,
             TooltipModule,
             LabelModule,
             SliderModule,
             MatIconModule,
             ImageViewerModule,
             ImageModule,
             DragDropModule,
             ToolsCoreModule,
             ToggleModule,
            MatIconModule,
          DatePickerModule,
          InputBoxModule,
          InventoryMaterialManagementModule,
          InventoryWarehouseManagementModule,
          InventoryLogisticsManagementModule,
          InventoryProcurementManagementModule,
          FormsModule,
          ReactiveFormsModule
          ],
          declarations: [
            WarehousePlanning,
            MaterialDashboardComponent,
            WarehouseMenuComponent,
            MaterialVendorOverviewComponent,
            AllWarehousesComponent,
            ProcurementPurchaseRequestComponent,
            ProcurementPurchaseOrderComponent,
            ProcurementBidComponent,
            LogisticMenuComponent,
            AddIssuanceDetailsComponent,
            AddShipmentDetailsComponent,
            ShipmentOverviewComponent,
            WarehouseOverviewComponent,
            PROCUREMENTMenuComponent,
            MaterialDashboardComponent
          ]
        })
        export class CustomTemplatesModule {
         static getComponent(name: any){
            const obj :any ={
              'evt_material-menu-component':MaterialDashboardComponent,
              "evt_Warehouse-Menu-Component":WarehouseMenuComponent,
              "evt-material-vendor-overview": MaterialVendorOverviewComponent,
           "evt-app-warehouse-overview": WarehouseOverviewComponent,
           "evt-procurement-purchase-request":ProcurementPurchaseRequestComponent,
           "evt-procurement-Bid": ProcurementBidComponent,
            "evt-procurement-purchase-order": ProcurementPurchaseOrderComponent,
          "evt-material-Issuance-create-form":AddIssuanceDetailsComponent,
           "evt-Issuance-create-form": AddShipmentDetailsComponent,
                 "evt-shipment-overview":ShipmentOverviewComponent,
                 "evt-procurement-dashboard-view": PROCUREMENTMenuComponent,
                 "evt-logisticMenu-component": LogisticMenuComponent,
                 "evt-all-warehouse-dashboard": AllWarehousesComponent,
                 "ev-shipmentComponent":AddShipmentDetailsComponent
                }
            return obj[name] || null;
          }
         }
        
