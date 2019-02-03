import { NgModule } from '@angular/core';
import { TaskEditResolver } from 'src/app/company/tasks/task-edit/task-edit.resolver';
import { ProfileEditResolver } from 'src/app/company/profiles/profile-edit/profile-edit.resolver';
import { FieldEditResolver } from 'src/app/company/fields/field-edit/field-edit.resolver';
import { CompanyResolver } from 'src/app/company/company.resolver';
import { ToolsEditComponent } from 'src/app/company/tools/tools-edit/tools-edit.component';
import { ToolsComponent } from 'src/app/company/tools/tools.component';
import { FieldEditComponent } from 'src/app/company/fields/field-edit/field-edit.component';
import { TaskEditComponent } from 'src/app/company/tasks/task-edit/task-edit.component';
import { TaskTypesEditComponent } from 'src/app/company/task-types/task-types-edit/task-types-edit.component';
import { ProfileEditComponent } from 'src/app/company/profiles/profile-edit/profile-edit.component';
import { TaskTypesComponent } from 'src/app/company/task-types/task-types.component';
import { TasksComponent } from 'src/app/company/tasks/tasks.component';
import { CompanyComponent } from 'src/app/company/company.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/company/dashboard/dashboard.component';
import { FieldsComponent } from 'src/app/company/fields/fields.component';
import { ProfilesComponent } from 'src/app/company/profiles/profiles.component';

const routes: Routes = [
    {
        path: ':company_id',
        data: { title: 'dashboard' },
        component: CompanyComponent,
        resolve: { user: CompanyResolver },
        children: [
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
                path: 'fields/:objectId',
                data: { title: 'field' },
                resolve: { field: FieldEditResolver },
                component: FieldEditComponent
            },
            {
                path: 'tasks',
                data: { title: 'tasks' },
                component: TasksComponent
            },
            {
                path: 'tasks/:objectId',
                data: { title: 'task' },
                resolve: { task: TaskEditResolver },
                component: TaskEditComponent
            },
            {
                path: 'task_types',
                data: { title: 'task_types' },
                component: TaskTypesComponent
            },
            {
                path: 'task_types/:objectId',
                data: { title: 'task_types' },
                component: TaskTypesEditComponent
            },
            {
                path: 'tools',
                data: { title: 'tools' },
                component: ToolsComponent
            },
            {
                path: 'tools/:objectId',
                data: { title: 'tools' },
                component: ToolsEditComponent
            },
            {
                path: 'profiles',
                data: { title: 'profiles' },
                component: ProfilesComponent,
            },
            {
                path: 'profiles/:objectId',
                data: { title: 'profile edit' },
                resolve: { profile: ProfileEditResolver },
                component: ProfileEditComponent
            }
        ]
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
