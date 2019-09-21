import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import {
    ResponsiveActionsBottomSheetComponent
} from 'src/app/shared/app-responsive-actions/responsive-actions-bottom-sheet/responsive-actions-bottom-sheet.component';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-responsive-actions',
    templateUrl: './app-responsive-actions.component.html',
    styleUrls: ['./app-responsive-actions.component.scss']
})
export class AppResponsiveActionsComponent {
    @Input() public actions: Array<ResponsiveAction> = [];
    @Input() public filtersTemplate: TemplateRef<any>;
    @Output() public actionClick: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('actionsTemplate') public actionsTemplate: TemplateRef<any>;

    public constructor(private _bottomSheet: MatBottomSheet) {}

    public openBottomSheet(): void {
        console.log('should open bottom sheet');
        this._bottomSheet.open(ResponsiveActionsBottomSheetComponent, {
            data: {
                menuTemplate: this.actionsTemplate
            }
        })
        .afterDismissed()
        .pipe(
            filter(selected_key => selected_key)
        )
        .subscribe(
            selected_key => this.actionClick.emit(selected_key)
        );
    }
}
