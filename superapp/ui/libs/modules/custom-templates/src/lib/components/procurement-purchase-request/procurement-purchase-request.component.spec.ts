import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementPurchaseRequestComponent } from './procurement-purchase-request.component';

describe('CustomOverviewComponent', () => {
  let component: ProcurementPurchaseRequestComponent;
  let fixture: ComponentFixture<ProcurementPurchaseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementPurchaseRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementPurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
