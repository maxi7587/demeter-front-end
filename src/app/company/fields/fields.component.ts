import { Component, OnInit } from '@angular/core';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router } from '@angular/router';
import { FieldsService } from 'src/app/shared/services/fields.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent extends CompanyTemplateComponent {

    private _fields: {[key: string]: any} = {};
    set fields(fields: {[key: string]: any}) { this._fields = fields; }
    get fields(): {[key: string]: any} { return this._fields; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        private fieldsService: FieldsService,
        protected router: Router,
        protected navigationService: NavigationService
    ) {
        super(router, navigationService);
        this.fieldsService.all().subscribe(fields => {
            this.fields = fields;
            // TODO: uncomment following for loop for desktop
            // for (let key of Object.keys(fields.results[0])) {
            //     if (['id', 'url'].indexOf(key) === -1) {
            //         this.columns.push(new Column(key, key));
            //     }
            // }

            // TODO: improve for mobile
            this.columns.push(new Column('name', 'name', 'name'));
            this.columns.push(new Column('info', 'name', '', 'info', 'end center'));
        });
    }

    public goToElement(element_id) {
        console.log('id ---->', element_id);
        this.router.navigate([this.router.url, element_id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

}
