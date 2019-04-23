import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User } from 'src/app/shared/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    public sign_up_form: FormGroup = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        repeat_password: new FormControl('', Validators.required)
    });

    public constructor(
        public usersService: UsersService,
        public router: Router
    ) { console.log('form group --->', this.sign_up_form); }

    public ngOnInit() {}

    public save() {
        if (
            this.sign_up_form.status !== 'VALID' ||
            this.sign_up_form.value.password !== this.sign_up_form.value.repeat_password
        ) {
            return;
        }
        let new_user = new User();
        new_user.username = this.sign_up_form.value.email;
        new_user.email = this.sign_up_form.value.email;
        new_user.first_name = this.sign_up_form.value.first_name;
        new_user.last_name = this.sign_up_form.value.last_name;
        new_user.password = this.sign_up_form.value.password;
        new_user.is_staff = false;
        this.usersService.save(new_user).subscribe(
            user => this.router.navigate([`/users/${user.id}/companies`])
        );
    }

}
