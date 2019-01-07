import { NgModule } from '@angular/core';
import { UserRoutingModule } from 'src/app/user/user-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompaniesComponent } from './companies/companies.component';

@NgModule({
  declarations: [CompaniesComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
