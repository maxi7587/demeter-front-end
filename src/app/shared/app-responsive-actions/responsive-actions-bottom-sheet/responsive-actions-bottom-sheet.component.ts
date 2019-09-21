import { Component, Inject, TemplateRef } from '@angular/core';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-responsive-actions-bottom-sheet',
    templateUrl: 'responsive-actions-bottom-sheet.component.html',
})
export class ResponsiveActionsBottomSheetComponent {
    public menu_template: TemplateRef<any>;

    public constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
            menuTemplate: TemplateRef<any>
        },
        private _bottomSheetRef: MatBottomSheetRef<ResponsiveActionsBottomSheetComponent>
    ) {
        this.menu_template = data.menuTemplate;
    }

    public close(): void {
        this._bottomSheetRef.dismiss();
    }
}
