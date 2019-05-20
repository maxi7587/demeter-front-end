// TODO: improve navigation component implementation relating to OOP
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UsersService, User } from 'src/app/shared/services/users.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { NavigationService, NavigationSidenavLink } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

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
        delete?: boolean;
        save?: boolean;
        cancel?: boolean;
        menu?: boolean;
    } = {
        search: false,
        add: false,
        delete: false,
        save: false,
        cancel: false,
        menu: false
    };

    public user: User;

    private _route_data: {[key: string]: any};
    set route_data(data: {[key: string]: any}) { this._route_data = data; }
    get route_data(): {[key: string]: any} { return this._route_data; }

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public companyiesService: CompaniesService,
        public usersService: UsersService,
        public navigationService: NavigationService,
        public oAuthService: OAuthService
    ) {
        activatedRoute.data.subscribe(data => {
            this.route_data = data;
        });

        usersService.getUser()
            .subscribe(
                user => this.user = user
            );
    }

    public ngOnInit() {
        this.nav_actions_subscription = this.navigationService.actions.subscribe(actions => this.nav_actions = actions);
        // this.navigationService.sidenav_links.subscribe(
        //     sections => {
        //         this.sections = sections;
        //     }
        // );
    }

    public ngOnDestroy() {
        this.nav_actions_subscription.unsubscribe();
    }

    public logout() {
        this.usersService.user = undefined;
        localStorage.clear();
        sessionStorage.clear();
        this.oAuthService.logOut();
        this.router.navigate(['/auth']);
    }

    public goToSection(section) {
        this.router.navigate([section]);
    }

    public goToParent() {
        console.log(this.activatedRoute.snapshot.data.parent);
        // this.router.navigate();
    }

    public actionClick(action, data?: any) {
        console.log('clicked action --->', action, data);
        if (action === 'search') {
            this.navigationService.search_filter = data;
        }
        this.navigationService.actionClick.next(action);
    }

}
