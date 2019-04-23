import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPlotDialogComponent } from './field-plot-dialog.component';

describe('FieldPlotDialogComponent', () => {
  let component: FieldPlotDialogComponent;
  let fixture: ComponentFixture<FieldPlotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldPlotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldPlotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
