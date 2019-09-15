import { Component, ViewChild, ChangeDetectorRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SuppliesService, Supply } from 'src/app/shared/services/supplies.service';
import { NavigationService } from 'src/app/shared/navigation/navigation.service';
import { SupplyTransaction, SupplyTransactionsService } from 'src/app/shared/services/supply-transactions.service';
import { Company } from 'src/app/shared/services/companies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { Observable } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-supply-transaction-form',
    templateUrl: './supply-transaction-form.component.html',
    styleUrls: ['./supply-transaction-form.component.scss']
})
export class SupplyTransactionFormComponent implements OnInit {
    @ViewChild('updateRelatedUser') public updateRelatedUser: MatCheckbox;
    @Input() public supply_transaction: SupplyTransaction;
    @Input() public supply: Supply;
    @Input() public field: Field;
    @Input() public type: 'input'|'output';
    public supply_transaction_types = ['input', 'output'];
    public supply_transaction_status = ['confirmed', 'draft'];

    public supply_transaction_form: FormGroup = new FormGroup({
        date: new FormControl('', [Validators.required]),
        quantity: new FormControl(0, [Validators.required]),
        amount: new FormControl(0, [Validators.required]),
        supply: new FormControl(null, [Validators.required]),
        type: new FormControl(null, [Validators.required]),
        status: new FormControl(null, [Validators.required]),
        field: new FormControl(null, [Validators.required])
    });

    public company: Company;
    public supplies: DRFCollection<Supply>;
    public fields: DRFCollection<Field>;

    public constructor(
        protected router: Router,
        protected changeDetectorRef: ChangeDetectorRef,
        protected supplyTransactionsService: SupplyTransactionsService,
        protected suppliesService: SuppliesService,
        protected companiesService: CompaniesService,
        protected fieldsService: FieldsService,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        let company_id = companiesService.getCompanyIdFromURL();
        if (company_id) {
            companiesService.getAndSetCompanyFromId(company_id)
                .subscribe(
                    company => this.supply_transaction_form.controls.company.setValue(company)
                );
        }
        let field_id = fieldsService.getFieldIdFromURL();
        if (field_id) {
            fieldsService.get(field_id).subscribe(
                field => this.supply_transaction_form.controls.field.setValue(field)
            );
        }
    }

    public ngOnInit() {
        console.log('field in supply_transaction-form ng on init --->', this.field);
        if (this.supply) {
            // this.supply_transaction.field = this.supply_transaction.field || this.field;
            // IMPORTANT: have to seet both fields manually
            this.supply_transaction_form.controls.supply.setValue(this.field);
        }
        if (this.field) {
            // this.supply_transaction.field = this.supply_transaction.field || this.field;
            this.supply_transaction_form.controls.field.setValue(this.field);
        }
        if (this.type) {
            // this.supply_transaction.field = this.supply_transaction.field || this.field;
            this.supply_transaction_form.controls.type.setValue(this.type);
        }
        this.suppliesService
            .all()
            .subscribe((supplies: DRFCollection<Supply>) => {
                this.supplies = supplies;
            });
        this.fieldsService
            .all()
            .subscribe((fields: DRFCollection<Field>) => {
                this.fields = fields;
            });
        if (!this.supply_transaction && this.activatedRoute.snapshot.params.objectId) {
            this.supplyTransactionsService.get(this.activatedRoute.snapshot.params.objectId)
                .subscribe(
                    (supply_transaction: SupplyTransaction) => {
                        this.supply_transaction = supply_transaction;
                        this.fillFormData(this.supply_transaction);
                    }
                );
        } else if (!this.supply_transaction && !this.activatedRoute.snapshot.params.objectId) {
            this.supply_transaction = new SupplyTransaction();
            this.fillFormData(this.supply_transaction);
        } else {
            this.fillFormData(this.supply_transaction);
        }

        console.log('supply_transaction_form VALUE --->', this.supply_transaction_form.value);
        this.changeDetectorRef.detectChanges();
    }

    public fillFormData(data: SupplyTransaction) {
        for (let form_field in this.supply_transaction_form.controls) {
            if (this.supply_transaction.hasOwnProperty(form_field)) {
                this.supply_transaction_form.controls[form_field].setValue(this.supply_transaction[form_field]);
            }
        }
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.supply_transaction_form.controls[key].setValue(value);
    }

    public save(): Observable<SupplyTransaction> {
        console.log('supply_transaction_form ----->', this.supply_transaction_form);
        this.supply_transaction = {
            ...this.supply_transaction,
            ...this.supply_transaction_form.value,
            ...{ company: this.companiesService.company }
        };
        console.log('will save this supply_transaction --->', this.supply_transaction);

        return <Observable<SupplyTransaction>>this.supplyTransactionsService.save(this.supply_transaction);
    }

}
