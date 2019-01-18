import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfilesService } from 'src/app/company/profiles/profiles.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {

    @Input() public service;
    @Input() public columns: Array<Column> = [];
    @Input() public colums_displayed: {
        ['xs']?: Array<string>;
        ['sm']?: Array<string>;
        ['m']?: Array<string>;
        ['l']?: Array<string>;
    } = {};

    private _params: Params;
    private _collection: {[key: string]: any} = {};
    set collection(collection: {[key: string]: any}) { this._collection = collection; }
    get collection(): {[key: string]: any} { return this._collection; }
    // private _columns: Array<Column> = [];
    // set columns(columns: Array<Column>) { this._columns = columns; }
    // get columns(): Array<Column> { return this._columns; }

    public constructor(
        private activatedRoute: ActivatedRoute,
        private profilesService: ProfilesService
    ) {
        this.activatedRoute.params.subscribe(
            params => this._params = params
        );
        this.profilesService.getProfiles().subscribe(profiles => {
            this.collection = profiles;
            console.log(profiles);
            console.log(profiles.results[0]);
            // TODO: uncomment following for loop for desktop
            // for (let key of Object.keys(profiles.results[0])) {
            //     if (['id', 'url'].indexOf(key) === -1) {
            //         this.columns.push(new Column(key, key));
            //     }
            // }

            // TODO: improve for mobile
            this.columns.push(new Column('first_name', 'first_name', 'first_name'));
            this.columns.push(new Column('info', 'first_name', '', 'info', 'end center'));
        });
    }

    public ngOnInit() {}

}
