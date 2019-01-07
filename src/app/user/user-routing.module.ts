import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from 'src/app/user/companies/companies.component';

const routes: Routes = [
    {
        path: 'companies',
        data: { title: 'companies' },
        component: CompaniesComponent
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
