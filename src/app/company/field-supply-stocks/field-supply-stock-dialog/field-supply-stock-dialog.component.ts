import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FieldSupplyStock } from 'src/app/shared/services/field-supply-stocks.service';
import {
    FieldSupplyStockFormComponent
} from 'src/app/company/field-supply-stocks/field-supply-stock-form/field-supply-stock-form.component';
import { Field } from 'src/app/shared/services/fields.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-field-supply-stock-dialog',
    templateUrl: './field-supply-stock-dialog.component.html',
    styleUrls: ['./field-supply-stock-dialog.component.scss']
})
export class FieldSupplyStockDialogComponent {
    @ViewChild('fieldSupplyStockForm') public field_supply_stock_form: FieldSupplyStockFormComponent;

    public constructor(
        public dialogRef: MatDialogRef<FieldSupplyStockDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { field: Field; field_supply_stock: FieldSupplyStock }
    ) {
        console.log('data in field_supply_stock-dialog --->', this.data);
    }

    public save(): void {
        this.field_supply_stock_form.save().subscribe(
            field_supply_stock => {
                console.log('saved field_supply_stock --->', field_supply_stock);
                this.dialogRef.close(field_supply_stock);
            }
        );
    }
}
