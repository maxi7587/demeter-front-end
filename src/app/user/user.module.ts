import { NgModule } from '@angular/core';
import { CompanyEditResolver } from 'src/app/user/companies/company-edit/company-edit.resolver';
import { UserTemplateComponent } from 'src/app/user/user-template/user-template.component';
import { UserRoutingModule } from 'src/app/user/user-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompaniesComponent } from './companies/companies.component';
import { UserComponent } from './user.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';

@NgModule({
    declarations: [
        CompaniesComponent,
        UserComponent,
        CompanyEditComponent,
        UserTemplateComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UserRoutingModule
    ],
    providers: [
        CompanyEditResolver
    ]
})
export class UserModule { }
