import { Component, ViewChild, ChangeDetectorRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SuppliesService } from 'src/app/shared/services/supplies.service';
import { SupplyTransactionsService, SupplyTransaction } from 'src/app/shared/services/supply-transactions.service';
import { NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Receipt, ReceiptsService } from 'src/app/shared/services/receipts.service';
import { Company } from 'src/app/shared/services/companies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { Observable } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-receipt-form',
    templateUrl: './receipt-form.component.html',
    styleUrls: ['./receipt-form.component.scss']
})
export class ReceiptFormComponent implements OnInit {
    @ViewChild('updateRelatedUser') public updateRelatedUser: MatCheckbox;
    @Input() public disabled: boolean;
    @Input() public receipt: Receipt;
    @Input() public field: Field;
    @Input() public type: 'input'|'output';
    public receipt_types = ['input', 'output'];
    public receipt_status = ['confirmed', 'draft'];

    public receipt_form: FormGroup = new FormGroup({
        document_id: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        amount: new FormControl(0, [Validators.required]),
        type: new FormControl(null, [Validators.required]),
        status: new FormControl(null, [Validators.required]),
        field: new FormControl(null, [Validators.required]),
        company: new FormControl(null, [Validators.required])
    });

    public company: Company;
    public fields: DRFCollection<Field>;
    // public supply_transactions: DRFCollection<SupplyTransaction>;
    public supply_transactions: Array<SupplyTransaction>;

    public constructor(
        protected router: Router,
        protected changeDetectorRef: ChangeDetectorRef,
        protected receiptsService: ReceiptsService,
        protected companiesService: CompaniesService,
        protected fieldsService: FieldsService,
        protected supplyTransactionsService: SupplyTransactionsService,
        protected suppliesService: SuppliesService,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        let company_id = companiesService.getCompanyIdFromURL();
        if (company_id) {
            companiesService.getAndSetCompanyFromId(company_id)
                .subscribe(
                    company => this.receipt_form.controls.company.setValue(company)
                );
        }
        let field_id = fieldsService.getFieldIdFromURL();
        if (field_id) {
            fieldsService.get(field_id).subscribe(
                field => this.receipt_form.controls.field.setValue(field)
            );
        }
    }

    public ngOnInit() {
        console.log('field in receipt-form ng on init --->', this.field);
        // if (this.field) {
        //     // this.receipt.field = this.receipt.field || this.field;
        //     this.receipt.controls.field.setValue(this.field);
        //     this.receipt_form.controls.field.setValue(this.field);
        // }
        // if (this.type) {
        //     // this.receipt.field = this.receipt.field || this.field;
        //     this.receipt_form.controls.type.setValue(this.type);
        // }
        // this.supplyTransactionsService
        //     .all()
        //     .subscribe((supply_transactions: DRFCollection<SupplyTransaction>) => {
        //         this.supply_transactions = supply_transactions;
        //     });
        this.fieldsService
            .all()
            .subscribe((fields: DRFCollection<Field>) => {
                this.fields = fields;
            });
        if (!this.receipt && this.activatedRoute.snapshot.params.objectId) {
            this.receiptsService.get(this.activatedRoute.snapshot.params.objectId)
                .subscribe(
                    (receipt: Receipt) => {
                        this.receipt = receipt;
                        this.supply_transactions = receipt.receipt_supply_transactions;
                        console.log(this.supply_transactions);
                        console.log('receipt_supply_transactions --->', receipt.receipt_supply_transactions);
                        this.fillFormData(this.receipt);
                    }
                );
        } else if (!this.receipt && !this.activatedRoute.snapshot.params.objectId) {
            this.receipt = new Receipt();
            this.fillFormData(this.receipt);
        } else {
            this.fillFormData(this.receipt);
        }

        if (this.field) {
            // this.receipt.field = this.receipt.field || this.field;
            this.receipt.field = this.field;
            this.receipt_form.controls.field.setValue(this.field);
        }
        if (this.type) {
            // this.receipt.field = this.receipt.field || this.field;
            this.receipt_form.controls.type.setValue(this.type);
        }


        console.log('receipt_form VALUE --->', this.receipt_form.value);
        this.changeDetectorRef.detectChanges();
    }

    public fillFormData(data: Receipt) {
        for (let form_field in this.receipt_form.controls) {
            if (this.receipt.hasOwnProperty(form_field)) {
                this.receipt_form.controls[form_field].setValue(this.receipt[form_field]);
            }
        }
        if (this.disabled) {
            console.log('---------- WILL DISABLE FORM! ----------');
            this.receipt_form.disable();
        }
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.receipt_form.controls[key].setValue(value);
    }

    public addSupplyTransaction() {
        if (!this.receipt.receipt_supply_transactions) {
            this.receipt.receipt_supply_transactions = [];
        }
        let new_supply_transaction = new SupplyTransaction();
        new_supply_transaction.id = 'new_' + Math.floor(Math.random() * 10 * 6);
        this.receipt.receipt_supply_transactions.push(new_supply_transaction);
    }

    public updateSupplyTransaction(supply_transaction, field_name, value) {
        console.log('value', value);

        supply_transaction[field_name] = value;
        console.log('supply_transaction', supply_transaction);
    }

    public removeSupplyTransaction(supply_transaction_id) {
        let supply_transaction_index = this.receipt.receipt_supply_transactions.find(
            supply_transaction => supply_transaction.id === supply_transaction_id
        );
        this.receipt.receipt_supply_transactions.splice(supply_transaction_id, 1);
    }

    public save(): Observable<Receipt> {
        // TODO: this should be done by the server
        console.log(this.receipt.receipt_supply_transactions);
        console.log('receipt_form ----->', this.receipt_form);
        this.receipt = {
            ...this.receipt,
            ...this.receipt_form.value,
            ...{ company: this.companiesService.company }
        };
        if (this.receipt.receipt_supply_transactions) {
            for (let supply_transaction of this.receipt.receipt_supply_transactions) {
                delete supply_transaction.id; // django fails to ignore the ID in reverse Foreign keys
                supply_transaction.type = this.receipt.type;
                supply_transaction.status = this.receipt.status;
                supply_transaction.field = this.receipt.field;
                supply_transaction.date = this.receipt.date;
                supply_transaction.company = this.receipt.company;
            }
        }
        console.log('will save this receipt --->', this.receipt);

        return <Observable<Receipt>>this.receiptsService.save(this.receipt);
    }

}
