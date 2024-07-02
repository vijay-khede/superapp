import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forms.ComponentComponent } from './forms.component.component';

describe('Forms.ComponentComponent', () => {
  let component: Forms.ComponentComponent;
  let fixture: ComponentFixture<Forms.ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Forms.ComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Forms.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
