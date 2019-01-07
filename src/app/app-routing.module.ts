import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'user',
        loadChildren: 'src/app/user/user.module#UserModule'
    },
    {
        path: 'company',
        loadChildren: 'src/app/company/company.module#CompanyModule'
    },
    // {
    //     path: '**',
    //     loadChildren: 'src/app/auth/auth.module#AuthModule'
    // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
