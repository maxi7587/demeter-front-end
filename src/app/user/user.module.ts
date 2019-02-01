import { NgModule } from '@angular/core';
import { UserRoutingModule } from 'src/app/user/user-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompaniesComponent } from './companies/companies.component';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [CompaniesComponent, UserComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
