import { NgModule } from '@angular/core';
import { ReceiptFormComponent } from 'src/app/company/receipts/receipt-form/receipt-form.component';
import { ReceiptsComponent } from 'src/app/company/receipts/receipts.component';
import { ReceiptDialogComponent } from 'src/app/company/receipts/receipt-dialog/receipt-dialog.component';
import { SupplyEditResolver } from 'src/app/company/supplies/supply-edit/supply-edit.resolver';
import {
    SupplyTransactionDialogComponent
} from 'src/app/company/supply-transactions/supply-transaction-dialog/supply-transaction-dialog.component';
import {
    SupplyTransactionFormComponent
} from 'src/app/company/supply-transactions/supply-transaction-form/supply-transaction-form.component';
import { SupplyTransactionsComponent } from 'src/app/company/supply-transactions/supply-transactions.component';
import { SupplyDialogComponent } from 'src/app/company/supplies/supply-dialog/supply-dialog.component';
import { SupplyFormComponent } from 'src/app/company/supplies/supply-form/supply-form.component';
import { SupplyEditComponent } from 'src/app/company/supplies/supply-edit/supply-edit.component';
import { SuppliesComponent } from 'src/app/company/supplies/supplies.component';
import { ToolFormComponent } from 'src/app/company/tools/tool-form/tool-form.component';
import { ToolDialogComponent } from 'src/app/company/tools/tool-dialog/tool-dialog.component';
import { ProfileFormComponent } from 'src/app/company/profiles/profile-form/profile-form.component';
import { ProfileDialogComponent } from 'src/app/company/profiles/profile-dialog/profile-dialog.component';
import { ChargeFormComponent } from 'src/app/company/charges/charge-form/charge-form.component';
import { ChargeDialogComponent } from 'src/app/company/charges/charge-dialog/charge-dialog.component';
import { ContractTypeDialogComponent } from 'src/app/company/contract-types/contract-type-dialog/contract-type-dialog.component';
import { ContractTypeFormComponent } from 'src/app/company/contract-types/contract-type-form/contract-type-form.component';
import { TaskFormComponent } from 'src/app/company/tasks/task-form/task-form.component';
import { FieldPlotEditResolver } from 'src/app/company/field-plots/field-plots-edit/field-plots-edit.resolver';
import { FieldPlotEditComponent } from 'src/app/company/field-plots/field-plots-edit/field-plots-edit.component';
import { FieldPlotFormComponent } from 'src/app/company/field-plots/field-plot-form/field-plot-form.component';
import { FieldPlotsComponent } from 'src/app/company/field-plots/field-plots.component';
import { ToolEditResolver } from 'src/app/company/tools/tools-edit/tool-edit.resolver';
import { TaskEditResolver } from 'src/app/company/tasks/task-edit/task-edit.resolver';
import { ProfileEditResolver } from 'src/app/company/profiles/profile-edit/profile-edit.resolver';
import { FieldEditResolver } from 'src/app/company/fields/field-edit/field-edit.resolver';
import { CompanyResolver } from 'src/app/company/company.resolver';
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
import { FieldRowsComponent } from './field-rows/field-rows.component';
import { FieldRowsEditComponent } from './field-rows/field-rows-edit/field-rows-edit.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RolesComponent } from './roles/roles.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { CompanyTemplateComponent } from './company-template/company-template.component';
import { FieldPlotDialogComponent } from './field-plots/field-plot-dialog/field-plot-dialog.component';
import { FieldPlotInfoDialogComponent } from './field-plots/field-plot-info-dialog/field-plot-info-dialog.component';
import { TaskFullfilmentDialogComponent } from './tasks/task-fullfilment-dialog/task-fullfilment-dialog.component';
import { TaskDialogComponent } from 'src/app/company/tasks/task-dialog/task-dialog.component';
import { StaffComponent } from './staff/staff.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ChargesComponent } from './charges/charges.component';
import { ContractTypesComponent } from './contract-types/contract-types.component';

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
        FieldRowsComponent,
        FieldRowsEditComponent,
        UsersComponent,
        UserEditComponent,
        RolesComponent,
        RoleEditComponent,
        FieldPlotsComponent,
        CompanyTemplateComponent,
        FieldPlotEditComponent,
        FieldPlotFormComponent,
        FieldPlotDialogComponent,
        FieldPlotInfoDialogComponent,
        TaskFullfilmentDialogComponent,
        TaskFormComponent,
        TaskDialogComponent,
        StaffComponent,
        InventoryComponent,
        ChargesComponent,
        ContractTypesComponent,
        ContractTypeFormComponent,
        ContractTypeDialogComponent,
        ChargeFormComponent,
        ChargeDialogComponent,
        ProfileDialogComponent,
        ProfileFormComponent,
        SupplyTransactionsComponent,
        SupplyTransactionFormComponent,
        SupplyTransactionDialogComponent,
        SuppliesComponent,
        SupplyEditComponent,
        SupplyFormComponent,
        SupplyDialogComponent,
        ReceiptsComponent,
        ReceiptFormComponent,
        ReceiptDialogComponent,
        ToolFormComponent,
        ToolDialogComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CompanyRoutingModule
    ],
    providers: [
        CompanyResolver,
        FieldEditResolver,
        ProfileEditResolver,
        TaskEditResolver,
        ToolEditResolver,
        SupplyEditResolver,
        FieldPlotEditResolver
    ],
    entryComponents: [
        FieldPlotDialogComponent,
        FieldPlotInfoDialogComponent,
        TaskFullfilmentDialogComponent,
        TaskDialogComponent,
        ContractTypeDialogComponent,
        ChargeDialogComponent,
        ProfileDialogComponent,
        ReceiptDialogComponent,
        SupplyDialogComponent,
        SupplyTransactionDialogComponent,
        ToolDialogComponent
    ]
})
export class CompanyModule { }
