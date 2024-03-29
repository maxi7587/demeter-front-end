// TODO: merge company and user template in one template called navigation-child
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DRFResource } from 'src/app/shared/basic-drf.service';
import { Router, ActivatedRoute } from '@angular/router';
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
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        this.navigationService.title = this.activatedRoute.snapshot.data.title;
        this.navigationService.actions.next(new SidenavActions(['search', 'add']));
        this.actions_subscription = this.navigationService.actionClick.subscribe(action => {
            switch (action) {
                case 'search':
                    this.search();
                    break;
                case 'add':
                    console.log('------------------------');
                    console.log('------------------------');
                    console.log('-------will call add-------');
                    console.log('------------------------');
                    console.log('------------------------');
                    this.add();
                    break;
                case 'delete':
                    this.delete();
                    break;
                case 'save':
                    console.log('save case');
                    this.save();
                    break;
                case 'menu':
                    console.log('save case');
                    this.menu();
                    break;
                case 'cancel':
                    console.log('save case');
                    this.cancel();
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

    public menu() {
        console.log('inside menu method');
    }

    public cancel() {
        console.log('inside cancel method');
    }
}
