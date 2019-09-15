import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPlotFormComponent } from './field-plot-form.component';

describe('FieldPlotFormComponent', () => {
  let component: FieldPlotFormComponent;
  let fixture: ComponentFixture<FieldPlotFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldPlotFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldPlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
