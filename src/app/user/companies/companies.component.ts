import { Component, OnInit } from '@angular/core';
import { UsersService, User } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { CompaniesService, Company } from 'src/app/shared/services/companies.service';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
    private _user: User;
    set user(user: User) { this._user = user; }
    get user(): User { return this._user; }

    private _companies: DRFCollection<Company>;
    set companies(companies: DRFCollection<Company>) { this._companies = companies; }
    get companies(): DRFCollection<Company> { return this._companies; }

    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        private router: Router,
        private companiesService: CompaniesService,
        protected usersService: UsersService
    ) {
        companiesService.all().subscribe(companies => {
            console.log(companies);
            this.companies = companies;
            for (let key of Object.keys(companies.results[0])) {
                if (['id', 'url'].indexOf(key) === -1) {
                    this.columns.push(new Column(key, key));
                }
            }
        });
        usersService.all().subscribe(users => this.user = users.results[0]);
    }

    public ngOnInit() { }

    public goToCompany(company: Company) {
        this.companiesService.company = company;
        this.router.navigate(['/companies/' + company.id + '/dashboard']);
    }

}
