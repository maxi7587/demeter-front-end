import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { DRFCollection, DRFResource } from 'src/app/shared/basic-drf.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Column } from './table-elements';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, AfterViewInit {

    @Input() public columns: Array<Column>;
    @Input() public rows: Array<{[key: string]: any}>;
    @Input() public tableClasses: Array<string>;
    @Input() public collection: DRFCollection<any>;
    @Input() public overridePagination: boolean;

    @Output() public rowClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() public paginationChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    @ViewChild('paginator') public paginator: MatPaginator;

    public displayedColumns: Array<string>;
    public dataSource: MatTableDataSource<{[key: string]: any}> = new MatTableDataSource();

    public constructor(
        public httpClient: HttpClient,
        public oAuthService: OAuthService
    ) { }

    public ngOnChanges() {
        this.dataSource.data = this.rows;
        this.displayedColumns = this.columns.map(column => column.key);
        console.log('this.collection ----------->', this.collection);
    }

    public ngAfterViewInit() {
        this.paginator.length = this.collection.count;
    }

    public updatePage(pagination_event) {
        let destination: string;
        console.log('pagination_event --->', pagination_event);
        let page_regex = /\?page=(\d+)/;
        let next: any = page_regex.exec(this.collection.next);
        if (next) {
            next = parseInt(next[1], 10);
        }
        let previous: any = page_regex.exec(this.collection.previous);
        if (previous) { previous = parseInt(previous[1], 10); }
        if (this.collection.previous !== null && !previous) {
            previous = 1;
        }
        console.log('next --------------->', next);
        console.log('previous --------------->', previous);
        if (this.overridePagination) {
            // TODO: crate overridePagination Output
            return;
        }

        if (pagination_event.pageIndex + 1 === next) {
            console.log('------------------------------------------------');
            console.log('GO TO NExT');
            console.log('------------------------------------------------');
            destination = 'next';
        }

        if (pagination_event.pageIndex + 1 === previous || previous === 1) {
            console.log('------------------------------------------------');
            console.log('GO TO PREvIOUS');
            console.log('------------------------------------------------');
            destination = 'previous';
        }

        if (!destination) {
            return;
        }

        let headers = new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': this.oAuthService.authorizationHeader()
        });

        this.httpClient.get(
            this.collection[destination],
            { headers: headers }
        ).subscribe(
            (collection: DRFCollection<DRFResource>) => {
                console.log('got next page collection --------->', collection);
                this.collection = collection;
                this.dataSource.data = collection.results;
                this.paginator.length = collection.count;
            }
        );
    }

}
