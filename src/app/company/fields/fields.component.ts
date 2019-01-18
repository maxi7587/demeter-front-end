import { Component, OnInit } from '@angular/core';
import { FieldsService } from 'src/app/company/fields/fields.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {

    private _fields: {[key: string]: any} = {};
    set fields(fields: {[key: string]: any}) { this._fields = fields; }
    get fields(): {[key: string]: any} { return this._fields; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(private fieldsService: FieldsService) {
        this.fieldsService.getFields().subscribe(fields => {
            this.fields = fields;
            console.log(fields);
            console.log(fields.results[0]);
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

    public ngOnInit() {}

}
