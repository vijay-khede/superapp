import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPopUpWindowComponent } from './dashboard-pop-up-window.component';

describe('DashboardPopUpWindowComponent', () => {
  let component: DashboardPopUpWindowComponent;
  let fixture: ComponentFixture<DashboardPopUpWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPopUpWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPopUpWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
