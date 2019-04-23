import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPlotsComponent } from './field-plots.component';

describe('FieldPlotsComponent', () => {
  let component: FieldPlotsComponent;
  let fixture: ComponentFixture<FieldPlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldPlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
