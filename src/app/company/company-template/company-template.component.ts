import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService, SidenavActions, NavigationSidenavLink } from 'src/app/shared/navigation/navigation.service';

@Component({
    selector: 'app-company-template',
    templateUrl: './company-template.component.html',
    styleUrls: ['./company-template.component.scss']
})
export class CompanyTemplateComponent implements OnInit, OnDestroy {

    public route_data: {[key: string]: any};
    public sections_links: Array<NavigationSidenavLink> = [];

    public actions_subscription: Subscription;

    public constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        this.navigationService.title = activatedRoute.snapshot.data.title;
        this.navigationService.actions.next(new SidenavActions(['search', 'add']));
        this.actions_subscription = this.navigationService.actionClick.subscribe(action => {
            switch (action) {
                case 'search':
                    this.search(this.navigationService.search_filter);
                    break;
                case 'add':
                    console.log('should call company templae component add() method');
                    this.add();
                    break;
                case 'delete':
                    this.delete();
                    break;
                case 'save':
                    this.save();
                    break;
                case 'cancel':
                    this.cancel();
                    break;
                case 'menu':
                    this.menu();
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
        console.log('inside add method in CompanyTemplateComponent');
        // this.router.navigate([this.router.url, '0']);
    }

    public search(filter: string) {
        console.log('inside search method: ', filter);
    }

    public delete() {
        console.log('inside delete method');
    }

    public save() {
        console.log('inside save method');
    }

    public cancel() {
        console.log('inside save method');
    }

    public menu() {
        console.log('inside save method');
    }

}
