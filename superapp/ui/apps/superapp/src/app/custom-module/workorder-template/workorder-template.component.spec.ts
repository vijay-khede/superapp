import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderTemplateComponent } from './workorder-template.component';

describe('WorkorderTemplateComponent', () => {
  let component: WorkorderTemplateComponent;
  let fixture: ComponentFixture<WorkorderTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkorderTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
