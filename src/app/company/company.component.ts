import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService, NavigationSidenavLink } from 'src/app/shared/navigation/navigation.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {

    public sections_links: Array<NavigationSidenavLink> = [];

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected companiesService: CompaniesService,
        protected navigationService: NavigationService
    ) {
        this.activatedRoute.params
            .subscribe(params => {
                this.companiesService.getCompanyFromId(params.company_id);
                let sections_links = [
                    new NavigationSidenavLink('Perfiles', 'companies/' + params.company_id + '/profiles', 'account_circle'),
                    new NavigationSidenavLink('Campos', 'companies/' + params.company_id + '/fields', 'wb_sunny'),
                    new NavigationSidenavLink('Tareas', 'companies/' + params.company_id + '/tasks', 'assignment'),
                    new NavigationSidenavLink('Herramientas', 'companies/' + params.company_id + '/tools', 'build')
                ];
                console.log('sections --->', sections_links);
                this.sections_links = sections_links;
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
