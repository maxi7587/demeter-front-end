import { NgModule } from '@angular/core';
import { LoginService } from 'src/app/auth/login/login.service';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordService } from './reset-password/reset-password.service';
import { ChangePasswordService } from './change-password/change-password.service';

@NgModule({
    declarations: [AuthComponent, SignUpComponent, LoginComponent, ResetPasswordComponent, ChangePasswordComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule
    ],
    providers: [
        LoginService
    ]
})
export class AuthModule {
    public constructor() {
        console.log('inside auth module COSNTRUCTOR');
    }
}
