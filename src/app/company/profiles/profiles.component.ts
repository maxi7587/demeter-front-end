import { Component, OnInit } from '@angular/core';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilesService } from 'src/app/shared/services/profiles.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent extends CompanyTemplateComponent {
    private _profiles: {[key: string]: any} = {};
    set profiles(profiles: {[key: string]: any}) { this._profiles = profiles; }
    get profiles(): {[key: string]: any} { return this._profiles; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        private profilesService: ProfilesService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.profilesService.all().subscribe(profiles => {
            this.profiles = profiles;
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

    public goToElement(element_id) {
        this.router.navigate([this.router.url, element_id]);
    }

}
