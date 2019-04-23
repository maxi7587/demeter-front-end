import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ContractTypeFormComponent } from 'src/app/company/contract-types/contract-type-form/contract-type-form.component';
import { Field } from 'src/app/shared/services/fields.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-contract-type-dialog',
    templateUrl: './contract-type-dialog.component.html',
    styleUrls: ['./contract-type-dialog.component.scss']
})
export class ContractTypeDialogComponent {
    @ViewChild('contractTypeForm') public contract_type_form: ContractTypeFormComponent;

    public constructor(
        public dialogRef: MatDialogRef<ContractTypeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { field: Field }
    ) {}

    public save(): void {
        this.contract_type_form.save().subscribe(
            contract_type => {
                console.log('saved contract_type --->', contract_type);
                this.dialogRef.close(contract_type);
            }
        );
    }
}
