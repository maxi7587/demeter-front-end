import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Supply } from 'src/app/shared/services/supplies.service';
import { Receipt } from 'src/app/shared/services/receipts.service';
import {
    ReceiptFormComponent
} from 'src/app/company/receipts/receipt-form/receipt-form.component';
import { Field } from 'src/app/shared/services/fields.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-receipt-dialog',
    templateUrl: './receipt-dialog.component.html',
    styleUrls: ['./receipt-dialog.component.scss']
})
export class ReceiptDialogComponent {
    @ViewChild('receiptForm') public receipt_form: ReceiptFormComponent;
    public original_status: 'draft'|'confirmed'|'failed';

    public constructor(
        public dialogRef: MatDialogRef<ReceiptDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            field: Field;
            receipt: Receipt;
            type: 'input'|'output';
        }
    ) {
        // TODO: improve this verifications to disable save in confirmed receipts
        if (data.receipt) {
            this.original_status = data.receipt.status;
        }
        console.log('data in receipt-dialog --->', this.data);
    }

    public save(): void {
        this.receipt_form.save().subscribe(
            receipt => {
                console.log('saved receipt --->', receipt);
                this.dialogRef.close(receipt);
            }
        );
    }
}
