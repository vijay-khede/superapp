import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderDashboardComponent } from './workorder-dashboard.component';

describe('WorkorderDashboardComponent', () => {
  let component: WorkorderDashboardComponent;
  let fixture: ComponentFixture<WorkorderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkorderDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
