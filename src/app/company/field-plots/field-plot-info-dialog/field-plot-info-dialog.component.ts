import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FieldPlot } from 'src/app/shared/services/field-plots.service';
import { FieldPlotFormComponent } from 'src/app/company/field-plots/field-plot-form/field-plot-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-field-plot-info-dialog',
  templateUrl: './field-plot-info-dialog.component.html',
  styleUrls: ['./field-plot-info-dialog.component.scss']
})
export class FieldPlotInfoDialogComponent {
    @ViewChild('fieldPlotForm') public field_plot_form: FieldPlotFormComponent;

    public attributes_order = [
        'company', 'field', 'code', 'label', 'status', 'manager'
    ];

    public constructor(
        public dialogRef: MatDialogRef<FieldPlotInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { field_plot: FieldPlot }
    ) {}

    public orderAttribute(attribute: string): number {
        let attribute_order = this.attributes_order.indexOf(attribute);
        if (attribute_order === -1) {
            return this.attributes_order.length + 1;
        } else {
            return attribute_order;
        }
    }

}
