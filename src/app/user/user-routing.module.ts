import { NgModule } from '@angular/core';
import { UserComponent } from 'src/app/user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from 'src/app/user/companies/companies.component';

const routes: Routes = [
    {
        path: ':user_id',
        data: { title: 'user' },
        component: UserComponent,
        children: [
            {
                path: 'companies',
                data: { title: 'companies' },
                component: CompaniesComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
    public static components = [
        CompaniesComponent
    ];
}
