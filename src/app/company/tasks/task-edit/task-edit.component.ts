import { Component, OnInit } from '@angular/core';
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

    public constructor() { }

    public ngOnInit() {
    }

}
