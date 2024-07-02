import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousePlanning } from './warehouse-planning.component';

describe('WarehousePlanning', () => {
  let component: WarehousePlanning;
  let fixture: ComponentFixture<WarehousePlanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousePlanning ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousePlanning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
