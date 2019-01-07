import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/company/profiles/profiles.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
    private _profiles: {[key: string]: any} = {};
    set profiles(profiles: {[key: string]: any}) { this._profiles = profiles; }
    get profiles(): {[key: string]: any} { return this._profiles; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(private profilesService: ProfilesService) {
        this.profilesService.getProfiles().subscribe(profiles => {
            this.profiles = profiles;
            for (let key of Object.keys(profiles.results[0])) {
                if (['id', 'url'].indexOf(key) === -1) {
                    this.columns.push(new Column(key, key));
                }
            }
            console.log('----------------got profiles----------------');
            console.log(this.profiles);
            console.log(this.columns);
            console.log('--------------------------------------------');
        });
    }

    public ngOnInit() {}

}
