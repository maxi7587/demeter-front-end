import { NgModule } from '@angular/core';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-forms.component';
import { Column } from 'src/app/shared/table/table-elements';
import { MeasureUnitsService } from 'src/app/shared/services/measure-units.service';
import { FullTableComponent } from 'src/app/shared/list/full-table.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: 'src/app/auth/auth.module#AuthModule'
    },
    {
        path: 'users',
        loadChildren: 'src/app/user/user.module#UserModule'
    },
    {
        path: 'companies',
        loadChildren: 'src/app/company/company.module#CompanyModule'
    },
    {
        path: 'list',
        component: FullTableComponent,
        data: {
            service: MeasureUnitsService,
            columns: [
                new Column('id', 'id'),
                new Column('quantity_type', 'quantity_type', '', '', 'end center')
            ]
        }
    },
    {
        path: 'form',
        component: DynamicFormComponent,
        data: {
            service: MeasureUnitsService
        }
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
