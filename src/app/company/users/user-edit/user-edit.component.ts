import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    public user_form: FormGroup = new FormGroup({
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
