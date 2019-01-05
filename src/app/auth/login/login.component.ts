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

    public constructor(
        private loginService: LoginService
    ) {
        console.log('inside login component CONSTRUCTOR');
    }

    public ngOnInit() { }

    public login() {
        console.log('will call login service login()');
        this.loginService.login().subscribe(() => console.log('AFTER POST response arrived'));
    }

}
