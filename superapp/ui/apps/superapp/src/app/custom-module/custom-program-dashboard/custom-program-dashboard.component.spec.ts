import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProgramDashboardComponent } from './custom-program-dashboard.component';

describe('CustomProgramDashboardComponent', () => {
  let component: CustomProgramDashboardComponent;
  let fixture: ComponentFixture<CustomProgramDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomProgramDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProgramDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
