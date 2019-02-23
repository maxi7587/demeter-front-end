import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { NavigationService, NavigationSidenavLink, SidenavActions } from 'src/app/shared/navigation/navigation.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
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
        this.activatedRoute.params
            .subscribe(params => {
                this.companiesService.getCompanyFromId(params.company_id).subscribe(
                    company => console.log('company ---------->', company)
                );
                let sections_links = [
                    new NavigationSidenavLink('Cambiar de compañía', 'users/' + this.route_data.user.id + '/companies', 'arrow_back'),
                    new NavigationSidenavLink('Inicio', 'companies/' + params.company_id + '/dashboard', 'dashboard'),
                    new NavigationSidenavLink('Perfiles', 'companies/' + params.company_id + '/profiles', 'account_circle'),
                    new NavigationSidenavLink('Campos', 'companies/' + params.company_id + '/fields', 'wb_sunny'),
                    new NavigationSidenavLink('Tareas', 'companies/' + params.company_id + '/tasks', 'assignment'),
                    new NavigationSidenavLink('Herramientas', 'companies/' + params.company_id + '/tools', 'build')
                ];
                this.sections_links = sections_links;
                this.navigationService.actions.next(new SidenavActions());
                // this.navigationService.sidenav_links.next(sections_links);
            }
        );
    }

    public ngOnInit() {
    }

    public ngOnDestroy() {
        console.log('copmpanies component OnDestroy');
        this.navigationService.sidenav_links.next([]);
    }

}
