import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { Router } from '@angular/router';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent extends CompanyTemplateComponent {

    private _tools: {[key: string]: any} = {};
    set tools(tools: {[key: string]: any}) { this._tools = tools; }
    get tools(): {[key: string]: any} { return this._tools; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        protected router: Router,
        private toolsService: ToolsService,
        protected navigationService: NavigationService
    ) {
        super(router, navigationService);
        this.toolsService.all().subscribe(tools => {
            this.tools = tools;
            // TODO: improve for mobile
            this.columns.push(new Column('name', 'name', 'name'));
            this.columns.push(new Column('status', 'status', '', '', 'center center'));
            this.columns.push(new Column('field.name', 'field', '', '', 'end center'));
        });
    }

}
