import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/navigation/navigation.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { ActivatedRoute } from '@angular/router';
import { sections_links } from './company-sections-links';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected companiesService: CompaniesService,
        protected navigationService: NavigationService
    ) {
        console.log('sections --->', sections_links);
        this.activatedRoute.params.subscribe(params => this.companiesService.company);

        this.navigationService.sidenav_links.next(sections_links);
    }

    public ngOnInit() {
    }

}
