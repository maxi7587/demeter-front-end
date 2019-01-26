import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldElementsEditComponent } from './field-elements-edit.component';

describe('FieldElementsEditComponent', () => {
  let component: FieldElementsEditComponent;
  let fixture: ComponentFixture<FieldElementsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldElementsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldElementsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
