import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { ResetPasswordComponent } from 'src/app/auth/reset-password/reset-password.component';
import { AuthComponent } from 'src/app/auth/auth.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: { title: 'authentication' },
        component: AuthComponent
    },
    {
        path: 'reset_password',
        data: { title: 'Reset password' },
        component: ResetPasswordComponent
    },
    {
        path: 'change_password',
        data: { title: 'Change password' },
        component: ChangePasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
    public static components = [AuthComponent];
}
