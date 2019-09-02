import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation/delete-confirmation-dialog.component';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-floating-menu',
  templateUrl: 'floating-menu.component.html'
})
export class FloatingMenuComponent {

    @Input() public service: BasicDRFService;
    @Output() public actionsClick: EventEmitter<{action: string; item: any}> = new EventEmitter();
    @ViewChild(MatMenuTrigger) public contextMenu: MatMenuTrigger;

    public contextMenuPosition = { x: '0px', y: '0px' };

    public constructor(
        public matDialog: MatDialog
    ) { }

    public onContextMenu(event: MouseEvent, item: Item) {
        event.preventDefault();
        this.contextMenuPosition.x = event.clientX + 'px';
        this.contextMenuPosition.y = event.clientY + 'px';
        this.contextMenu.menuData = { 'item': item };
        this.contextMenu.openMenu();
    }

    public edit(item: Item) {
        console.log(`Click on edit for ${item.id}`);
        this.actionsClick.emit({action: 'edit', item: item});
    }

    public delete(item: Item) {
        console.log(`Click on delete for ${item.id}`);
        this.showDeleteConfirmationDialog()
            .pipe(
                filter(response => response)
            )
            .subscribe(
                () => {
                    this.service.delete(item.id)
                        .subscribe(
                            response => {
                                // this.actionsClick.emit({action: 'deleted', item: item});
                                this.actionsClick.emit({action: 'delete', item: item});
                                console.log('DELETE response --->', response);
                            }
                        );
                }
            );
    }

    private showDeleteConfirmationDialog() {
        return this.matDialog.open(DeleteConfirmationDialogComponent).afterClosed();
    }
}

export interface Item {
    id: number;
}
