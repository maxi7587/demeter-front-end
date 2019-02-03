import { Component, OnInit } from '@angular/core';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/shared/services/tasks.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

    public task_form: FormGroup = new FormGroup({
        name: new FormControl(),
        field: new FormControl(),
        task_type: new FormControl(),
        priority: new FormControl(),
        duration: new FormControl(),
        status: new FormControl(),
        created_by: new FormControl(),
        supervised_by: new FormControl(),
        assigned_worker: new FormControl(),
        details: new FormControl(),
        started_at: new FormControl(),
        finished_at: new FormControl(),
        tool: new FormControl(),
        from_element: new FormControl(),
        to_element: new FormControl()
    });
    protected task: Task;

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        this.task = this.activatedRoute.snapshot.data.task;
        for (let form_field in this.task_form.controls) {
            if (this.task[form_field]) {
                this.task_form.controls[form_field].setValue(this.task[form_field]);
            }
        }
    }

    public ngOnInit() {
        this.navigationService.actions.next(new SidenavActions(['delete']));
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

}
