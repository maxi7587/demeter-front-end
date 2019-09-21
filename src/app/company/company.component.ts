import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile } from 'src/app/shared/services/user-profiles.service';
import { UsersService, User } from 'src/app/shared/services/users.service';
import { NavigationService, NavigationSidenavLink, SidenavActions } from 'src/app/shared/navigation/navigation.service';
import { CompaniesService, Company } from 'src/app/shared/services/companies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {

    public route_data: {[key: string]: any};
    public sections_links: Array<NavigationSidenavLink> = [];

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected companiesService: CompaniesService,
        protected usersService: UsersService,
        protected navigationService: NavigationService
    ) {
        this.route_data = this.activatedRoute.snapshot.data;
        // let user: User;

        this.companiesService.getAndSetCompanyFromId(activatedRoute.snapshot.params.company_id).subscribe(
            company => console.log('company ---------->', company)
        );
        this.usersService.getUser()
            .subscribe(
                user => {
                    let user_company_profile = this.getUserCompanyProfile(user, activatedRoute.snapshot.params.company_id);
                    let sections_links: Array<NavigationSidenavLink>;
                    if (user_company_profile.role === 'Administrator') {
                        sections_links = [
                            new NavigationSidenavLink(
                                'Change company', 'users/' + this.route_data.user.id + '/companies', 'arrow_back'
                            ),
                            new NavigationSidenavLink(
                                'Home', `companies/${activatedRoute.snapshot.params.company_id}/dashboard`, 'dashboard'
                            ),
                            new NavigationSidenavLink(
                                'Staff', `companies/${activatedRoute.snapshot.params.company_id}/profiles`, 'account_circle'
                            ),
                            new NavigationSidenavLink(
                                'Fields', `companies/${activatedRoute.snapshot.params.company_id}/fields`, 'wb_sunny'
                            ),
                            new NavigationSidenavLink(
                                'Tasks', `companies/${activatedRoute.snapshot.params.company_id}/tasks`, 'assignment'
                            ),
                            new NavigationSidenavLink('Tools', `companies/${activatedRoute.snapshot.params.company_id}/tools`, 'build'),
                            new NavigationSidenavLink(
                                'Inventory', `companies/${activatedRoute.snapshot.params.company_id}/inventory`, 'add_shopping_cart'
                            )
                        ];
                    } else  {
                        sections_links = [
                            new NavigationSidenavLink(
                                'Change company', 'users/' + this.route_data.user.id + '/companies', 'arrow_back'
                            )
                        ];
                    }
                    this.sections_links = sections_links;
                    this.navigationService.actions.next(new SidenavActions());
                    // this.navigationService.sidenav_links.next(sections_links);
                }
            );

        // this.activatedRoute.params
        //     .subscribe(params => {
        //         this.companiesService.getAndSetCompanyFromId(params.company_id).subscribe(
        //             company => console.log('company ---------->', company)
        //         );
        //         this.usersService.getUser()
        //             .subscribe(
        //                 user => {
        //                     user_company_profile = this.getUserCompanyProfile(user, params.company_id);
        //                     let sections_links = [
        //                         new NavigationSidenavLink(
        //                             'Change company', 'users/' + this.route_data.user.id + '/companies', 'arrow_back'
        //                         ),
        //                         new NavigationSidenavLink('Home', 'companies/' + params.company_id + '/dashboard', 'dashboard'),
        //                         new NavigationSidenavLink('Staff', 'companies/' + params.company_id + '/profiles', 'account_circle'),
        //                         new NavigationSidenavLink('Fields', 'companies/' + params.company_id + '/fields', 'wb_sunny'),
        //                         new NavigationSidenavLink('Tasks', 'companies/' + params.company_id + '/tasks', 'assignment'),
        //                         new NavigationSidenavLink('Tools', 'companies/' + params.company_id + '/tools', 'build')
        //                     ];
        //                     this.sections_links = sections_links;
        //                     this.navigationService.actions.next(new SidenavActions());
        //                     // this.navigationService.sidenav_links.next(sections_links);
        //                 }
        //             );
        //     }
        // );
    }

    public ngOnInit() {
    }

    public ngOnDestroy() {
        console.log('copmpanies component OnDestroy');
        this.navigationService.sidenav_links.next([]);
    }

    public getUserCompanyProfile(user: User, company_id: string): Profile {
        // TODO: profile relationships taken from User has reated keys, not full models... except role (has the name)
        // wait for the api to fix this
        console.log('user ---->', user);
        console.log('company_id ---->', company_id);
        let user_company_profile = user.demeter_profiles.find(profile => (profile.company as any).toString() === company_id);

        return user_company_profile;
    }

}
