import {
  Component,
  HostListener,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-delete-confirmation-dialog',
    templateUrl: './delete-confirmation-dialog.component.html'
})
export class DeleteConfirmationDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { text?: string },
        private matDialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    ) {
        this.data = data || {};
        if (!this.data.text) {
            this.data.text = 'Are you sure you want to delete this item?';
            console.log(this.data.text);
        }
    }

    public cancel() {
        this.close();
    }

    public delete() {
        this.close(true);
    }

    public close(confirm: boolean = false) {
        this.matDialogRef.close(confirm);
    }

    @HostListener('keydown.esc')
    public onEsc() {
        this.close();
    }
}
