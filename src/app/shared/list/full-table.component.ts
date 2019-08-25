import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, Injector } from '@angular/core';
import { DRFResource, BasicDRFService } from 'src/app/shared/basic-drf.service';
import { Field } from 'src/app/shared/services/fields.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-full-table',
    templateUrl: './full-table.component.html',
    styleUrls: ['./full-table.component.scss']
})
export class FullTableComponent extends CompanyTemplateComponent implements OnInit {

    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: string;
    @Input() public field: Field;
    @Input() public overrideRowClick: boolean;
    @Input() public showTabGroup = true;
    @Output() public rowClick: EventEmitter<DRFResource> = new EventEmitter();
    // @Input() public overrideCreate: boolean;
    // @Output() public createButton: EventEmitter<Resource> = new EventEmitter();
    @Input() public createFromDialog: boolean;
    @Input() public service: BasicDRFService;
    public resourceEditDialog: TemplateRef<{}>;

    // NOTE: filters
    // public status_options: Array<{[key: string]: string}> = [];
    // public filters_form: FormGroup = new FormGroup({
    //     status: new FormControl(this.status_options[0].value),
    // });

    public resources: {[key: string]: any} = {};
    public columns: Array<Column>;

    public constructor(
        public matDialog: MatDialog,
        protected router: Router,
        protected injector: Injector,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.service = injector.get<BasicDRFService>(this.activatedRoute.snapshot.data.service);
        console.log('Service --->', this.service);
        this.columns = this.activatedRoute.snapshot.data.columns;
        // this.filter = this.service.filter;
    }

    public ngOnInit() {
        this.getList(this.filter);

        // Populate table columns
        // TODO: improve for mobile
        // this.columns.push(new Column('id', 'id'));
        // this.columns.push(new Column('quantity_type', 'quantity_type', '', '', 'end center'));

        // this.filters_form.valueChanges
        //     .subscribe(
        //         filters => {
        //             this.getList(filters);
        //         }
        //     );
    }

    public getList(filter) {
        this.service
            .all(undefined, undefined, filter).subscribe(resources => {
                this.resources = resources;
                console.log('resources --->', this.resources);
            });
    }

    public goToElement(element) {
        if (this.overrideRowClick) {
            this.rowClick.emit(element);

            return;
        }

        this.router.navigate([this.router.url, element.id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

    // public createElement() {
    //     if (this.createFromDialog) {
    //         // this.createButton.emit(new Resource());
    //         this.createResourceDialog();
    //
    //         return;
    //     }
    //     this.router.navigate([this.router.url, '0']);
    // }
    //
    // public createResourceDialog(): void {
    //     const dialogRef = this.matDialog.open(this.resourceEditDialog, {
    //         width: '720px',
    //         data: {}
    //     });
    //
    //     dialogRef.afterClosed()
    //         .subscribe(result => {
    //             if (result) {
    //                 this.getList(this.filters_form.value);
    //             }
    //         }
    //     );
    // }

}
