import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tools-edit',
  templateUrl: './tools-edit.component.html',
  styleUrls: ['./tools-edit.component.scss']
})
export class ToolsEditComponent implements OnInit {

    public tool_form: FormGroup = new FormGroup({
        name: new FormControl(),
        code: new FormControl(),
        internal_code: new FormControl(),
        status: new FormControl(),
        field: new FormControl()
    });

    public constructor() { }

    public ngOnInit() {
    }

}
