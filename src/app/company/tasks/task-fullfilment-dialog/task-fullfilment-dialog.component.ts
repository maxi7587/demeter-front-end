import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Task, TasksService } from 'src/app/shared/services/tasks.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { FieldRowsService } from 'src/app/shared/services/field-rows.service';
import { FieldPlotsService } from 'src/app/shared/services/field-plots.service';
import { ProfilesService } from 'src/app/shared/services/profiles.service';
import { TaskType, TaskTypesService } from 'src/app/shared/services/task-types.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-fullfilment-dialog',
  templateUrl: './task-fullfilment-dialog.component.html',
  styleUrls: ['./task-fullfilment-dialog.component.scss']
})
export class TaskFullfilmentDialogComponent implements OnInit {
    @ViewChild('taskFullfilmentForm') public task_fullfilment_form: FormGroup;

    public status_options: Array<string> = ['todo', 'in_developement', 'ready'];
    public fieldDataFormGroup: FormGroup = new FormGroup({
        field: new FormControl(),
        field_plot: new FormControl(),
        from_row: new FormControl(),
        to_row: new FormControl(),
        details: new FormControl({value: '', disabled: true})
    });
    public workerAndTimeFormGroup: FormGroup = new FormGroup({
        assigned_worker: new FormControl(),
        started_at: new FormControl(),
        finished_at: new FormControl(),
        duration: new FormControl()
    });
    public taskTypeAndToolsFormGroup: FormGroup = new FormGroup({
        task_type: new FormControl(),
        tool: new FormControl([])
    });
    public taskStatusConfirmationFormGroup: FormGroup = new FormGroup({
        status: new FormControl(this.status_options[0])
    });

    public task_types: DRFCollection<TaskType>;
    public field_rows: DRFCollection<TaskType>;

    public constructor(
        public dialogRef: MatDialogRef<TaskFullfilmentDialogComponent>,
        public taskTypesService: TaskTypesService,
        public profilesService: ProfilesService,
        public fieldRowsService: FieldRowsService,
        public fieldPlotsService: FieldPlotsService,
        public toolsService: ToolsService,
        public tasksService: TasksService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.taskTypesService.all()
            .subscribe(
                (task_types: DRFCollection<TaskType>) => this.task_types = task_types
            );
    }

    public ngOnInit() {
        this.populateForm(this.data.task, this.fieldDataFormGroup);
        this.populateForm(this.data.task, this.workerAndTimeFormGroup);
        this.populateForm(this.data.task, this.taskTypeAndToolsFormGroup);
        this.populateForm(this.data.task, this.taskStatusConfirmationFormGroup);
        console.log('TASK --->', this.data.task);
    }

    public populateForm(task: Task, form: FormGroup) {
        for (let form_field in form.value) {
            if (task.hasOwnProperty(form_field)) {
                form.controls[form_field].setValue(task[form_field]);
            }
        }
    }

    public updateForm(form: FormGroup, key, value) {
        if (Array.isArray(this.data.task[key])) {
            this.data.task[key].push(value);

            return;
        }
        form.controls[key].setValue(value);
        this.data.task[key] = value;
    }

    public updateTaskDataWithForm(task: Task, form: FormGroup) {
        for (let form_field in form.value) {
            if (task.hasOwnProperty(form_field)) {
                task[form_field] = form.value[form_field];
            }
        }
    }

    public save(): void {
        this.updateTaskDataWithForm(this.data.task, this.fieldDataFormGroup);
        this.updateTaskDataWithForm(this.data.task, this.workerAndTimeFormGroup);
        this.updateTaskDataWithForm(this.data.task, this.taskTypeAndToolsFormGroup);
        this.updateTaskDataWithForm(this.data.task, this.taskStatusConfirmationFormGroup);
        console.log('WILL SAVE TASK --->', this.data.task);
        this.tasksService.save(this.data.task)
            .subscribe(
                task => console.log('saved task --->', task)
            );
    }

}
