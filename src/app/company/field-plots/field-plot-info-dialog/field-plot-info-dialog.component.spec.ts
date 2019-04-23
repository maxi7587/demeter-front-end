import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPlotInfoDialogComponent } from './field-plot-info-dialog.component';

describe('FieldPlotInfoDialogComponent', () => {
  let component: FieldPlotInfoDialogComponent;
  let fixture: ComponentFixture<FieldPlotInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldPlotInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldPlotInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
