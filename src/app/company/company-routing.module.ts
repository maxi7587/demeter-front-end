import { NgModule } from '@angular/core';
import { TasksComponent } from 'src/app/company/tasks/tasks.component';
import { CompanyComponent } from 'src/app/company/company.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/company/dashboard/dashboard.component';
import { FieldsComponent } from 'src/app/company/fields/fields.component';
import { ProfilesComponent } from 'src/app/company/profiles/profiles.component';

const routes: Routes = [
    {
        path: 'dashboard',
        data: { title: 'dashboard' },
        component: DashboardComponent,
    },
    {
        path: 'fields',
        data: { title: 'fields' },
        component: FieldsComponent
    },
    {
        path: 'tasks',
        data: { title: 'tasks' },
        component: TasksComponent
    },
    {
        path: 'profiles',
        data: { title: 'profiles' },
        component: ProfilesComponent
    }
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
        TasksComponent,
        ProfilesComponent
    ];
}
