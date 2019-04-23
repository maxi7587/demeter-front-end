import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-rows-edit',
  templateUrl: './field-rows-edit.component.html',
  styleUrls: ['./field-rows-edit.component.scss']
})
export class FieldRowsEditComponent implements OnInit {

    public field_row_form: FormGroup = new FormGroup({
        code: new FormControl(),
        field: new FormControl()
    });

    public constructor() { }

    public ngOnInit() {
    }

}
