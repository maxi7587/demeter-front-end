import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-elements-edit',
  templateUrl: './field-elements-edit.component.html',
  styleUrls: ['./field-elements-edit.component.scss']
})
export class FieldElementsEditComponent implements OnInit {

    public profile_form: FormGroup = new FormGroup({
        code: new FormControl(),
        field: new FormControl()
    });

    public constructor() { }

    public ngOnInit() {
    }

}
