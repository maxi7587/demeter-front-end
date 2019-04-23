import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRowsEditComponent } from './field-rows-edit.component';

describe('FieldRowsEditComponent', () => {
  let component: FieldRowsEditComponent;
  let fixture: ComponentFixture<FieldRowsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldRowsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRowsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
