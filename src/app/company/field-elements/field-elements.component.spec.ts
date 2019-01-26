import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldElementsComponent } from './field-elements.component';

describe('FieldElementsComponent', () => {
  let component: FieldElementsComponent;
  let fixture: ComponentFixture<FieldElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
