import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIssuanceDetailsComponent } from './add-issuance-details.component';

describe('AddIssuanceDetailsComponent', () => {
  let component: AddIssuanceDetailsComponent;
  let fixture: ComponentFixture<AddIssuanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIssuanceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIssuanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
