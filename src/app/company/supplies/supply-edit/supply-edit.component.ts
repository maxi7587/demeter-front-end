import { Component, OnInit, ViewChild, ComponentRef } from '@angular/core';
import { MeasureUnitsService, MeasureUnit } from 'src/app/shared/services/measure-units.service';
import { SupplyTransactionsComponent } from 'src/app/company/supply-transactions/supply-transactions.component';
import { SupplyTransaction } from 'src/app/shared/services/supply-transactions.service';
import { User } from 'src/app/shared/services/users.service';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company, CompaniesService } from 'src/app/shared/services/companies.service';
import { Supply, SuppliesService } from 'src/app/shared/services/supplies.service';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-supply-edit',
    templateUrl: './supply-edit.component.html',
    styleUrls: ['./supply-edit.component.scss']
})
export class SupplyEditComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;
    @ViewChild('supply_transactions') public supplyTransactionsComponent: SupplyTransactionsComponent;

    public supply_form: FormGroup = new FormGroup({
        pinned: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        field: new FormControl(null, [Validators.required]),
        measure_unit: new FormControl(null, [Validators.required]),
        actual_stock: new FormControl(),
        pending_stock: new FormControl(),
        desired_stock: new FormControl(),
    });

    public tab_index = {
        0: 'supplies',
        1: 'supply_transactions'
    };

    public company: Company;
    public fields: DRFCollection<Field>;
    public measure_units: DRFCollection<MeasureUnit>;
    public supply: Supply;

    public constructor(
        protected router: Router,
        protected suppliesService: SuppliesService,
        protected companiesService: CompaniesService,
        protected fieldsService: FieldsService,
        protected measureUnitsService: MeasureUnitsService,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.supply = this.activatedRoute.snapshot.data.supply;
        for (let form_field in this.supply_form.controls) {
            if (this.supply[form_field]) {
                this.supply_form.controls[form_field].setValue(this.supply[form_field]);
            }
        }
    }

    public ngOnInit() {
        console.log('this.company --->', this.company);
        this.fieldsService
            .all()
            .subscribe((fields: DRFCollection<Field>) => {
                this.fields = fields;
            });
        this.measureUnitsService
            .all(undefined, undefined, { page_size: 100 })
            .subscribe((measure_units: DRFCollection<MeasureUnit>) => {
                this.measure_units = measure_units;
            });
        if (!this.supply.id || this.supply.id === '0') {
            this.navigationService.actions.next(new SidenavActions(['save', 'cancel']));
        } else {
            this.navigationService.actions.next(new SidenavActions(['cancel', 'delete', 'save']));
        }
    }

    public selectedTabChange(tab: MatTabChangeEvent) {
        console.log('tab changed -------------->', tab);
        let selected_tab = this.tab_index[tab.index];
        console.log('tab index changed -------------->', selected_tab);

        switch (selected_tab) {
            case 'supply':
                if (!this.supply.id || this.supply.id === '0') {
                    this.navigationService.actions.next(new SidenavActions(['save', 'cancel']));
                } else {
                    this.navigationService.actions.next(new SidenavActions(['cancel', 'delete', 'save']));
                }
                break;
            case 'tasks':
                this.navigationService.actions.next(new SidenavActions(['search', 'add']));
                break;
        }
    }

    public updateForm(key, value) {
        this.supply_form.controls[key].setValue(value);
    }

    public getFormattedBirthDate(date: string): string {
        console.log('date ------->', date);
        if (!date) { return; }
        let day = new Date(date).getDate();
        let month = new Date(date).getMonth();
        let year = new Date(date).getFullYear();
        let birth_date = [year, month, day].join('-');

        return birth_date;
    }

    public add() {
        console.log(this.tabGroup.selectedIndex);
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];

        switch (selected_tab) {
            case 'supply_transactions':
                console.log('should add supply transaction');
                // this.supplyTransactionsComponent.createTaskDialog();
                // break;
        }
    }

    public search(filter: string) {
        console.log('inside search method: ', filter);
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];

        switch (selected_tab) {
            case 'supply_transactions':
                let supply_transactions_filter = {
                    ...this.supplyTransactionsComponent.filters_form.value,
                    ...{ name: filter }
                };
                console.log(
                    'this.supplyTransactionsComponent.filters_form.value --->',
                    this.supplyTransactionsComponent.filters_form.value
                );
                console.log('filter --->', filter);
                console.log('supply_transactions_filter --->', supply_transactions_filter);
                this.supplyTransactionsComponent.getList(supply_transactions_filter);
                break;
        }
    }

    public save() {
        this.supply = {
            ...this.supply,
            ...this.supply_form.value,
            ...{ company: this.companiesService.company }
        };
        console.log('will save this supply --->', this.supply);
        this.suppliesService.save(this.supply).subscribe((supply: Supply) => {
            console.log('supply saved', supply);
            this.supply = supply;
            this.router.navigate(['..'], { relativeTo: this.activatedRoute });
            console.log('this.supply', this.supply);
        });
    }

    public goToSuuplyTransaction(supply_transaction: SupplyTransaction) {
        console.log(`will navigate to --->../../supply_transactions/${supply_transaction.id}`);

        this.router.navigate([`../../supply_transactions/${supply_transaction.id}`], { relativeTo: this.activatedRoute });
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

}
