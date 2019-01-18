import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableInputComponent } from './expandable-input.component';

describe('ExpandableInputComponent', () => {
  let component: ExpandableInputComponent;
  let fixture: ComponentFixture<ExpandableInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandableInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
