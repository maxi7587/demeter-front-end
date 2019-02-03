import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { NavigationService, NavigationSidenavLink } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
    @Input() show_title = false;
    @Input() sections: Array<NavigationSidenavLink> = [];

    public nav_actions_subscription: Subscription;
    public nav_actions: {
        search?: boolean;
        add?: boolean;
        delete?: boolean
    } = {
        search: false,
        add: false,
        delete: false
    };

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
        this.nav_actions_subscription = this.navigationService.actions.subscribe(actions => this.nav_actions = actions);
        // this.navigationService.sidenav_links.subscribe(
        //     sections => {
        //         this.sections = sections;
        //     }
        // );
    }

    public goToSection(section) {
        this.router.navigate([section]);
    }

    public ngOnDestroy() {
        this.nav_actions_subscription.unsubscribe();
    }

}
