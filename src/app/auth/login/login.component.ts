import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/auth/login/login.service';

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

    public constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    public ngOnInit() { }

    public login() {
        if (!this.login_form.valid) {
            return;
        }
        this.loginService
            .login(this.login_form.value.email, this.login_form.value.password)
            .then(() => {
                this.router.navigate(['/user/companies']);
            });
    }
}
