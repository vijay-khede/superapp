import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentOverviewComponent } from './shipment-overview.component';

describe('CustomOverviewDealsComponent', () => {
  let component: ShipmentOverviewComponent;
  let fixture: ComponentFixture<ShipmentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
