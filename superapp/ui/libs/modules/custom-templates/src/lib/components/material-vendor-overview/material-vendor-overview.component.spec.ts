import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialVendorOverviewComponent } from './material-vendor-overview.component';

describe('MaterialVendorOverviewComponent', () => {
  let component: MaterialVendorOverviewComponent;
  let fixture: ComponentFixture<MaterialVendorOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialVendorOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialVendorOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
