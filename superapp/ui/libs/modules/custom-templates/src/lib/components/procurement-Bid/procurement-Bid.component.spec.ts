import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementBidComponent } from './procurement-Bid.component';

describe('CustomOverviewComponent', () => {
  let component: ProcurementBidComponent;
  let fixture: ComponentFixture<ProcurementBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementBidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
