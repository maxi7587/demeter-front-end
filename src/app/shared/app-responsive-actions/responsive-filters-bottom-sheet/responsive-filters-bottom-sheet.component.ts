import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-responsive-filters-bottom-sheet',
    templateUrl: 'responsive-filters-bottom-sheet.component.html',
})
export class ResponsiveFiltersBottomSheetComponent {
    public menu_template: TemplateRef<any>;

    public constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
            menuTemplate: TemplateRef<any>
        },
        private _bottomSheetRef: MatBottomSheetRef<ResponsiveFiltersBottomSheetComponent>
    ) {
        this.menu_template = data.menuTemplate;
    }

    public close(): void {
        this._bottomSheetRef.dismiss();
    }
}
