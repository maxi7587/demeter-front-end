// TODO: merge company and user template in one template called navigation-child
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DRFResource } from 'src/app/shared/basic-drf.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService, SidenavActions, NavigationSidenavLink } from 'src/app/shared/navigation/navigation.service';

@Component({
    selector: 'app-user-template',
    templateUrl: './user-template.component.html',
    styleUrls: ['./user-template.component.scss']
})
export class UserTemplateComponent implements OnInit, OnDestroy {

    public route_data: {[key: string]: any};
    public sections_links: Array<NavigationSidenavLink> = [];

    public actions_subscription: Subscription;

    public constructor(
        protected router: Router,
        protected navigationService: NavigationService
    ) {
        this.navigationService.actions.next(new SidenavActions(['search', 'add']));
        this.actions_subscription = this.navigationService.actionClick.subscribe(action => {
            switch (action) {
                case 'search':
                    this.search();
                    break;
                case 'add':
                    this.add();
                    break;
                case 'delete':
                    this.delete();
                    break;
                case 'save':
                    console.log('save case');
                    this.save();
                    break;
            }
        });
    }

    public ngOnInit() {
    }

    public ngOnDestroy() {
        this.actions_subscription.unsubscribe();
    }

    public add(): void {
        this.router.navigate([this.router.url, '0']);
    }

    public search() {
        console.log('inside search method');
    }

    public delete() {
        console.log('inside delete method');
    }

    public save() {
        console.log('inside save method');
    }
}
