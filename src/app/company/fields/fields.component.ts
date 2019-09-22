import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AppResponsiveActionsComponent } from 'src/app/shared/app-responsive-actions/app-responsive-actions.component';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldsService } from 'src/app/shared/services/fields.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('responsiveActions') public responsiveActions: AppResponsiveActionsComponent;
    public actions_model: Array<ResponsiveAction> = FieldsService.actions_model;

    @Input() public showActions = true;

    private _fields: {[key: string]: any} = {};
    set fields(fields: {[key: string]: any}) { this._fields = fields; }
    get fields(): {[key: string]: any} { return this._fields; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        private fieldsService: FieldsService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.navigationService.actions.next(new SidenavActions(['search', 'add']));
        this.getList({});
    }

    public ngOnInit() {
        // TODO: improve for mobile
        this.columns.push(new Column('name', 'name'));
        this.columns.push(new Column('status', 'status'));
    }

    public getList(filter) {
        this.fieldsService.all(undefined, undefined, filter).subscribe(fields => {
            this.fields = fields;
            // TODO: uncomment following for loop for desktop
            // for (let key of Object.keys(fields.results[0])) {
            //     if (['id', 'url'].indexOf(key) === -1) {
            //         this.columns.push(new Column(key, key));
            //     }
            // }
        });
    }

    public actionClick(action_key) {
        this[action_key]();
    }

    public createElement(): void {
        this.goToElement('0');
    }

    public goToElement(element_id) {
        this.router.navigate([this.router.url, element_id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

    public add() {
        this.router.navigate(['0'], { relativeTo: this.activatedRoute });
    }

    public search(search_string: string) {
        let name_filter = { name: search_string };
        this.getList(name_filter);
    }

}
