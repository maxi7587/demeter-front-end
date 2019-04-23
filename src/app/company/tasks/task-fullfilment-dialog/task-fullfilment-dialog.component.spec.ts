import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFullfilmentDialogComponent } from './task-fullfilment-dialog.component';

describe('TaskFullfilmentDialogComponent', () => {
  let component: TaskFullfilmentDialogComponent;
  let fixture: ComponentFixture<TaskFullfilmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFullfilmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFullfilmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
