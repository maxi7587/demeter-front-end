import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypesEditComponent } from './task-types-edit.component';

describe('TaskTypesEditComponent', () => {
  let component: TaskTypesEditComponent;
  let fixture: ComponentFixture<TaskTypesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTypesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
