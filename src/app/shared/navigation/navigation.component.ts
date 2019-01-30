import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { NavigationService, NavigationSidenavLink } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    private _sections: Array<NavigationSidenavLink> = [];
    get sections(): Array<NavigationSidenavLink> { return this._sections; }

    private _route_data: {[key: string]: any};
    set route_data(data: {[key: string]: any}) { this._route_data = data; }
    get route_data(): {[key: string]: any} { return this._route_data; }

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        protected companyiesService: CompaniesService,
        protected navigationService: NavigationService
    ) {
        console.log('inside navigation component');
        activatedRoute.data.subscribe(data => {
            this.route_data = data;
            console.log('route_data', this.route_data);
        });
    }

    public ngOnInit() {
        this.navigationService.sidenav_links.subscribe(
            sections => {
                this._sections = sections;
                console.log('sections --->', this._sections);
            }
        );
    }

    public goToSection(section) {
        console.log('WILL NAVIGATE TO SECTION', section);
        this.router.navigate(['/companies/' + this.companyiesService.company.id + '/' + section]);
    }

}
