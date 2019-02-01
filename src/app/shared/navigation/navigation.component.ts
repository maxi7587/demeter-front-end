import { Component, OnInit, Input } from '@angular/core';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { NavigationService, NavigationSidenavLink } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    @Input() show_title = false;
    @Input() sections: Array<NavigationSidenavLink> = [];

    private _route_data: {[key: string]: any};
    set route_data(data: {[key: string]: any}) { this._route_data = data; }
    get route_data(): {[key: string]: any} { return this._route_data; }

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        protected companyiesService: CompaniesService,
        protected navigationService: NavigationService
    ) {
        activatedRoute.data.subscribe(data => {
            this.route_data = data;
        });
    }

    public ngOnInit() {
        // this.navigationService.sidenav_links.subscribe(
        //     sections => {
        //         this.sections = sections;
        //     }
        // );
    }

    public goToSection(section) {
        this.router.navigate([section]);
    }

}
