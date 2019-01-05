import { NgModule } from '@angular/core';
import { LoginService } from 'src/app/auth/login/login.service';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [AuthComponent, SignUpComponent, LoginComponent],
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
