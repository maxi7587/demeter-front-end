import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from './table-elements';
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    @Input() public columns: Array<Column>;
    @Input() public rows: Array<{[key: string]: any}>;
    public displayedColumns: Array<string>;
    public dataSource: MatTableDataSource<{[key: string]: any}> = new MatTableDataSource();

    public constructor() { }

    public ngOnInit() {
        console.log('in ng on init');
        this.dataSource.data = this.rows;
        console.log('dataSource ----------->', this.dataSource.data);
        this.displayedColumns = this.columns.map(column => column.key);
        console.log('displayedColumns ----------->', this.displayedColumns);
    }

}
