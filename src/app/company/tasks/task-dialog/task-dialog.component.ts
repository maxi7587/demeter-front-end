import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Field } from 'src/app/shared/services/fields.service';
import { TaskFormComponent } from 'src/app/company/tasks/task-form/task-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
    @ViewChild('taskForm') public task_form: TaskFormComponent;

    public constructor(
        public dialogRef: MatDialogRef<TaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { field: Field }
    ) {}

    public save(): void {
        this.task_form.save().subscribe(
            task => {
                console.log('saved task --->', task);
                this.dialogRef.close(task);
            }
        );
    }
}
