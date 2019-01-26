import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyRoutingModule } from 'src/app/company/company-routing.module';
import { CommonModule } from '@angular/common';
import { ProfilesComponent } from './profiles/profiles.component';
import { DashboardComponent } from 'src/app/company/dashboard/dashboard.component';
import { FieldsComponent } from 'src/app/company/fields/fields.component';
import { CompanyComponent } from './company.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskTypesComponent } from './task-types/task-types.component';
import { ProfileEditComponent } from './profiles/profile-edit/profile-edit.component';
import { FieldEditComponent } from './fields/field-edit/field-edit.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskTypesEditComponent } from './task-types/task-types-edit/task-types-edit.component';
import { ToolsComponent } from './tools/tools.component';
import { ToolsEditComponent } from './tools/tools-edit/tools-edit.component';
import { FieldElementsComponent } from './field-elements/field-elements.component';
import { FieldElementsEditComponent } from './field-elements/field-elements-edit/field-elements-edit.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RolesComponent } from './roles/roles.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';

@NgModule({
    declarations: [
        DashboardComponent,
        FieldsComponent,
        ProfilesComponent,
        CompanyComponent,
        ResourcesListComponent,
        TasksComponent,
        TaskTypesComponent,
        ProfileEditComponent,
        FieldEditComponent,
        TaskEditComponent,
        TaskTypesEditComponent,
        ToolsComponent,
        ToolsEditComponent,
        FieldElementsComponent,
        FieldElementsEditComponent,
        UsersComponent,
        UserEditComponent,
        RolesComponent,
        RoleEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CompanyRoutingModule
    ]
})
export class CompanyModule { }
