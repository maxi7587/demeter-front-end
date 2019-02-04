import { NgModule } from '@angular/core';
import { PersonalInfoResolver } from 'src/app/user/personal-info/personal_info.resolver';
import { CompanyEditResolver } from 'src/app/user/companies/company-edit/company-edit.resolver';
import { UserTemplateComponent } from 'src/app/user/user-template/user-template.component';
import { UserRoutingModule } from 'src/app/user/user-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompaniesComponent } from './companies/companies.component';
import { UserComponent } from './user.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';

@NgModule({
    declarations: [
        CompaniesComponent,
        UserComponent,
        CompanyEditComponent,
        UserTemplateComponent,
        PersonalInfoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UserRoutingModule
    ],
    providers: [
        CompanyEditResolver,
        PersonalInfoResolver
    ]
})
export class UserModule { }
