import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.scss']
})
export class FieldEditComponent implements OnInit {

    public field_form: FormGroup = new FormGroup({
        name: new FormControl(),
        company: new FormControl(),
        manager: new FormControl(),
        details: new FormControl(),
        contact: new FormControl(),
        active: new FormControl()
    });


    public constructor() { }

    public ngOnInit() {
    }

}
