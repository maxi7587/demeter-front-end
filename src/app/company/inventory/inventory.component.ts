import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceiptsComponent } from 'src/app/company/receipts/receipts.component';
import { SuppliesComponent } from 'src/app/company/supplies/supplies.component';
import { SupplyTransactionsComponent } from 'src/app/company/supply-transactions/supply-transactions.component';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { NavigationService, SidenavActions } from 'src/app/shared/navigation/navigation.service';
import { ProfilesComponent } from 'src/app/company/profiles/profiles.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ChargesComponent } from 'src/app/company/charges/charges.component';
import { ContractTypesComponent } from 'src/app/company/contract-types/contract-types.component';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('supplies') public suppliesComponent: SuppliesComponent;
    @ViewChild('supply_transactions') public supplyTransactionsComponent: SupplyTransactionsComponent;
    @ViewChild('receipts') public receiptsComponent: ReceiptsComponent;
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;

    public tab_index = {
        0: 'supplies',
        1: 'supply_transactions'
    };

    public constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
    }

    public ngOnInit() {
        this.navigationService.actions.next(new SidenavActions(['search', 'add']));
    }

    public add() {
        console.log('tab ----------->', this.tabGroup.selectedIndex);
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];
        console.log('selected tab ----------->', selected_tab);

        switch (selected_tab) {
            case 'supplies':
                this.suppliesComponent.createElement();
                break;
            case 'receipts':
                // TODO: open dialog with actions and filters
                break;
            case 'supply_transactions':
                // TODO: open dialog with actions and filters
                // this.supplyTransactionsComponent.createSupplyTransactionDialog();
                break;
        }
    }

    public reloadSupplyTransactions() {
        this.supplyTransactionsComponent.getList(this.supplyTransactionsComponent.filters_form.value);
    }

    public reloadReceipts() {
        this.receiptsComponent.getList(this.receiptsComponent.filters_form.value);
    }

    public search(search_string_filter: string) {
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];

        switch (selected_tab) {
            case 'supplies':
                console.log('SUPPLIES: ', this.suppliesComponent);
                let filter = { first_name: search_string_filter };
                this.suppliesComponent.getList(filter);
                break;
            case 'supply_transactions':
                let supply_transactions = {
                    ...this.supplyTransactionsComponent.filters_form.value,
                    ...{ name: search_string_filter }
                };
                console.log('this.chargesComponent.filters_form.value --->', this.supplyTransactionsComponent.filters_form.value);
                console.log('filter --->', search_string_filter);
                console.log('supply_transactions --->', supply_transactions);
                this.supplyTransactionsComponent.getList(supply_transactions);
                break;
        }
    }

}
