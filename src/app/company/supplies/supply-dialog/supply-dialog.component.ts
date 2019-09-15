import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Supply } from 'src/app/shared/services/supplies.service';
import { SupplyFormComponent } from 'src/app/company/supplies/supply-form/supply-form.component';
import { Field } from 'src/app/shared/services/fields.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-supply-dialog',
    templateUrl: './supply-dialog.component.html',
    styleUrls: ['./supply-dialog.component.scss']
})
export class SupplyDialogComponent {
    @ViewChild('supplyForm') public supply_form: SupplyFormComponent;

    public constructor(
        public dialogRef: MatDialogRef<SupplyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { field: Field; supply: Supply }
    ) {
        console.log('data in supply-dialog --->', this.data);
    }

    public save(): void {
        this.supply_form.save().subscribe(
            supply => {
                console.log('saved supply --->', supply);
                this.dialogRef.close(supply);
            }
        );
    }
}
