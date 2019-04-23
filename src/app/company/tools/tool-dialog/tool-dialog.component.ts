import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ToolFormComponent } from 'src/app/company/tools/tool-form/tool-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from 'src/app/shared/services/fields.service';

@Component({
  selector: 'app-tool-dialog',
  templateUrl: './tool-dialog.component.html',
  styleUrls: ['./tool-dialog.component.scss']
})
export class ToolDialogComponent {
    @ViewChild('toolForm') public tool_form: ToolFormComponent;

    public constructor(
        public dialogRef: MatDialogRef<ToolDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { field: Field }
    ) {}

    public save(): void {
        this.tool_form.save().subscribe(
            tool => this.dialogRef.close(tool)
        );
    }
}
