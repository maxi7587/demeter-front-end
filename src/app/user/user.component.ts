import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { NavigationService, NavigationSidenavLink, SidenavActions } from 'src/app/shared/navigation/navigation.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    public sections_links: Array<NavigationSidenavLink> = [];

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected usersService: UsersService,
        protected navigationService: NavigationService
    ) {
        this.activatedRoute.params
            .subscribe(params => {
                // TODO: verify if user id matches the route's user id
                this.usersService.getUser();
                let sections_links = [
                    new NavigationSidenavLink('Profile', 'users/' + params.user_id + '/personal_info', 'account_circle'),
                    new NavigationSidenavLink('Companies', 'users/' + params.user_id + '/companies', 'work')
                ];
                console.log('sections --->', sections_links);
                this.sections_links = sections_links;
                this.navigationService.actions.next(new SidenavActions());
            }
        );
    }

    public ngOnInit() {
    }

}
