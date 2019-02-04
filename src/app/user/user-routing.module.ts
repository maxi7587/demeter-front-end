import { NgModule } from '@angular/core';
import { PersonalInfoResolver } from 'src/app/user/personal-info/personal_info.resolver';
import { PersonalInfoComponent } from 'src/app/user/personal-info/personal-info.component';
import { CompanyEditComponent } from 'src/app/user/companies/company-edit/company-edit.component';
import { CompanyEditResolver } from 'src/app/user/companies/company-edit/company-edit.resolver';
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
                path: 'personal_info',
                data: { title: 'personal information' },
                resolve: { user: PersonalInfoResolver },
                component: PersonalInfoComponent
            },
            {
                path: 'companies',
                data: { title: 'companies' },
                component: CompaniesComponent
            },
            {
                path: 'companies/:objectId',
                data: { title: 'companies' },
                resolve: { company: CompanyEditResolver },
                component: CompanyEditComponent
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
