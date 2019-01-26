import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-types-edit',
  templateUrl: './task-types-edit.component.html',
  styleUrls: ['./task-types-edit.component.scss']
})
export class TaskTypesEditComponent implements OnInit {

    public task_type_form: FormGroup = new FormGroup({
        name: new FormControl(),
        company: new FormControl()
    });

    public constructor() { }

    public ngOnInit() {
    }

}
