import { NgModule } from '@angular/core';
import { AuthComponent } from 'src/app/auth/auth.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: { title: 'authentication' },
        component: AuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
    public static components = [AuthComponent];
}
