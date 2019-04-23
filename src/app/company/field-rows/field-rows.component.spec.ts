import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRowsComponent } from './field-rows.component';

describe('FieldRowsComponent', () => {
  let component: FieldRowsComponent;
  let fixture: ComponentFixture<FieldRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
