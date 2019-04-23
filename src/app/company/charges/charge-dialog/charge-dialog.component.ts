import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ChargeFormComponent } from 'src/app/company/charges/charge-form/charge-form.component';
import { Field } from 'src/app/shared/services/fields.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-charge-dialog',
    templateUrl: './charge-dialog.component.html',
    styleUrls: ['./charge-dialog.component.scss']
})
export class ChargeDialogComponent {
    @ViewChild('chargeForm') public charge_form: ChargeFormComponent;

    public constructor(
        public dialogRef: MatDialogRef<ChargeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { field: Field }
    ) {}

    public save(): void {
        this.charge_form.save().subscribe(
            charge => {
                console.log('saved charge --->', charge);
                this.dialogRef.close(charge);
            }
        );
    }
}
