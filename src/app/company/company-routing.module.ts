import { NgModule } from '@angular/core';
import { CompanyComponent } from 'src/app/company/company.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/company/dashboard/dashboard.component';
import { FieldsComponent } from 'src/app/company/fields/fields.component';
import { ProfilesComponent } from 'src/app/company/profiles/profiles.component';

const routes: Routes = [
    // {
    //     path: '',
    //     component: CompanyComponent,
    //     children: [
    {
        path: 'dashboard',
        data: { title: 'dashboard' },
        component: DashboardComponent,
        children: [
            {
                path: 'fields',
                data: { title: 'fields' },
                component: FieldsComponent
            },
            {
                path: 'profiles',
                data: { title: 'profiles' },
                component: ProfilesComponent
            }
        ]
    }
    //     ]
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {
    public static components = [
        CompanyComponent,
        DashboardComponent,
        FieldsComponent,
        ProfilesComponent
    ];
}
