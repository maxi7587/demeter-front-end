import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/company/roles/roles.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    public profile_form: FormGroup = new FormGroup({
        first_name: new FormControl(),
        last_name: new FormControl(),
        company: new FormControl(),
        role: new FormControl(),
        daily_working_hours: new FormControl(),
        contact: new FormControl(),
        user: new FormControl()
    });

    public roles: Array<RolesService>;

    public constructor() { }

    public ngOnInit() {
    }

}
