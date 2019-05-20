import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/shared/services/user-profiles.service';
import { UserTemplateComponent } from 'src/app/user/user-template/user-template.component';
import { NavigationService, SidenavActions } from 'src/app/shared/navigation/navigation.service';
import { UsersService, User } from 'src/app/shared/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { CompaniesService, Company } from 'src/app/shared/services/companies.service';
import { Column } from 'src/app/shared/table/table-elements';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent extends UserTemplateComponent implements OnInit {
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
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected companiesService: CompaniesService,
        protected usersService: UsersService,
        protected matSnackBar: MatSnackBar,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        // companiesService.all(`users/${this.user.id}`).subscribe(companies => {
        //     console.log(companies);
        //     this.companies = companies;
        //     if (companies.results.length === 0) {
        //         return;
        //     }
        //     for (let key of Object.keys(companies.results[0])) {
        //         if (['id', 'url'].indexOf(key) === -1) {
        //             this.columns.push(new Column(key, key));
        //         }
        //     }
        // });

        // usersService.all().subscribe(users => {
        //     this.user = users.results[0];
        //     console.log('users --->', users);
        // });
        usersService.getUser(true).subscribe(user => {
            this.user = user;
            console.log('users --->', user);
            companiesService.all(`users/${this.user.id}/companies`).subscribe(companies => {
                console.log('companies ---->', companies);
                this.companies = companies;
                if (companies.results.length === 0) {
                    return;
                }
                for (let key of Object.keys(companies.results[0])) {
                    if (['id', 'url'].indexOf(key) === -1) {
                        this.columns.push(new Column(key, key));
                    }
                }
            });
        });
    }

    public ngOnInit() {
        this.navigationService.actions.next(new SidenavActions(['add']));
    }

    public goToCompany(company: Company): void {
        let user_company_profile = this.getUserCompanyProfile(this.user, company);
        // TODO: profile relationships taken from User has reated keys, not full models... except role (has the name)
        // wait for the api to fix this
        if (user_company_profile.role !== 'Administrator') {
            if (!user_company_profile.field) {
                let snack_bar = this.matSnackBar.open(
                    `You haven't been assigned to any field in this company, please conact the administrator`,
                    'Close',
                    { duration: 10000, verticalPosition: 'bottom', horizontalPosition: 'center' }
                );
                snack_bar.onAction().subscribe(() => snack_bar.dismiss());

                return;
            }
            this.companiesService.company = company;
            this.router.navigate(['/companies/' + company.id + '/fields/' + user_company_profile.field]);

            return;
        }
        this.companiesService.company = company;
        this.router.navigate(['/companies/' + company.id + '/dashboard']);
    }

    public goToCompanyEdit(company: Company): void {
        console.log(this.user);
        let user_company_profile = this.getUserCompanyProfile(this.user, company);
        // TODO: profile relationships taken from User has reated keys, not full models... except role (has the name)
        // wait for the api to fix this
        if (user_company_profile.role !== 'Administrator') {
            let snack_bar = this.matSnackBar.open(
                `You don't have permission to edit this company configuration`,
                'Close',
                { duration: 10000, verticalPosition: 'bottom', horizontalPosition: 'center' }
            );
            snack_bar.onAction().subscribe(() => snack_bar.dismiss());

            return;
        }
        this.router.navigate([this.router.url, company.id]);
    }

    public getUserCompanyProfile(user: User, company: Company): Profile {
        // TODO: profile relationships taken from User has reated keys, not full models... except role (has the name)
        // wait for the api to fix this
        let user_company_profile = user.demeter_profiles.find(profile => profile.company as any === company.id);

        return user_company_profile;
    }

}
