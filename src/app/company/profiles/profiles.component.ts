import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilesService } from 'src/app/shared/services/profiles.service';
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

    public constructor(
        private profilesService: ProfilesService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.profilesService.all().subscribe(profiles => {
            this.profiles = profiles;
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

    public goToElement(element_id) {
        console.log('id ---->', element_id);
        this.router.navigate([this.router.url, element_id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

}
