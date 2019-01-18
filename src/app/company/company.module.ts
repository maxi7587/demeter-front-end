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

@NgModule({
    declarations: [
        DashboardComponent,
        FieldsComponent,
        ProfilesComponent,
        CompanyComponent,
        ResourcesListComponent,
        TasksComponent,
        TaskTypesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CompanyRoutingModule
    ]
})
export class CompanyModule { }
