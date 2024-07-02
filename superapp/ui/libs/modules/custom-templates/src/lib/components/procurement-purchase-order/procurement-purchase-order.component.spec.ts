import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementPurchaseOrderComponent } from './procurement-purchase-order.component';

describe('CustomOverviewComponent', () => {
  let component: ProcurementPurchaseOrderComponent;
  let fixture: ComponentFixture<ProcurementPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementPurchaseOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
