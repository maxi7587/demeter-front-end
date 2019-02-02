import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

    private _tools: {[key: string]: any} = {};
    set tools(tools: {[key: string]: any}) { this._tools = tools; }
    get tools(): {[key: string]: any} { return this._tools; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(private toolsService: ToolsService) {
        this.toolsService.all().subscribe(tools => {
            this.tools = tools;
            console.log(tools);
            console.log(tools.results[0]);
            // TODO: improve for mobile
            this.columns.push(new Column('first_name', 'first_name', 'first_name'));
            this.columns.push(new Column('info', 'first_name', '', 'info', 'end center'));
        });
    }

    public ngOnInit() {
    }

}