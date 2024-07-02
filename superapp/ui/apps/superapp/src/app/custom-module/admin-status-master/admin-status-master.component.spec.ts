import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusMasterComponent } from './admin-status-master.component';

describe('AdminStatusMasterComponent', () => {
  let component: AdminStatusMasterComponent;
  let fixture: ComponentFixture<AdminStatusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStatusMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
