import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public login_form: FormGroup = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    public constructor(private loginService: LoginService) {
        console.log('inside login component CONSTRUCTOR');
    }

    public ngOnInit() { }

    public login() {
        if (!this.login_form.valid) {
            return;
        }
        console.log('will call login service login()', this.login_form);
        this.loginService.login(this.login_form.value.email, this.login_form.value.password)
            .then(() => console.log('AFTER POST response arrived'));
    }
}
