import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FieldPlotFormComponent } from 'src/app/company/field-plots/field-plot-form/field-plot-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from 'src/app/shared/services/fields.service';

@Component({
  selector: 'app-field-plot-dialog',
  templateUrl: './field-plot-dialog.component.html',
  styleUrls: ['./field-plot-dialog.component.scss']
})
export class FieldPlotDialogComponent {
    @ViewChild('fieldPlotForm') public field_plot_form: FieldPlotFormComponent;

    public constructor(
        public dialogRef: MatDialogRef<FieldPlotDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { field: Field }
    ) {}

    public save(): void {
        this.field_plot_form.save().subscribe(
            field_plot => this.dialogRef.close(field_plot)
        );
    }
}
