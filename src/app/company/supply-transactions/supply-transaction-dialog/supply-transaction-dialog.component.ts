import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Supply } from 'src/app/shared/services/supplies.service';
import { SupplyTransaction } from 'src/app/shared/services/supply-transactions.service';
import {
    SupplyTransactionFormComponent
} from 'src/app/company/supply-transactions/supply-transaction-form/supply-transaction-form.component';
import { Field } from 'src/app/shared/services/fields.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-supply-transaction-dialog',
    templateUrl: './supply-transaction-dialog.component.html',
    styleUrls: ['./supply-transaction-dialog.component.scss']
})
export class SupplyTransactionDialogComponent {
    @ViewChild('supplyTransactionForm') public supply_transaction_form: SupplyTransactionFormComponent;

    public constructor(
        public dialogRef: MatDialogRef<SupplyTransactionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            field: Field;
            supply_transaction: SupplyTransaction;
            type: 'input'|'output';
            supply?: Supply;
        }
    ) {
        console.log('data in supply-transaction-dialog --->', this.data);
    }

    public save(): void {
        this.supply_transaction_form.save().subscribe(
            supply_transaction => {
                console.log('saved supply_transaction --->', supply_transaction);
                this.dialogRef.close(supply_transaction);
            }
        );
    }
}
