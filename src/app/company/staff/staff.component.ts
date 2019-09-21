import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { NavigationService, SidenavActions } from 'src/app/shared/navigation/navigation.service';
import { ProfilesComponent } from 'src/app/company/profiles/profiles.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ChargesComponent } from 'src/app/company/charges/charges.component';
import { ContractTypesComponent } from 'src/app/company/contract-types/contract-types.component';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss']
})
export class StaffComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('profiles') public profilesComponent: ProfilesComponent;
    @ViewChild('charges') public chargesComponent: ChargesComponent;
    @ViewChild('contractTypes') public contractTypesComponent: ContractTypesComponent;
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;

    public tab_index = {
        0: 'profiles',
        1: 'charges',
        2: 'contract_types'
    };

    public constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
    }

    public ngOnInit() {
        this.navigationService.actions.next(new SidenavActions(['search', 'add']));
    }

    public add() {
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];

        switch (selected_tab) {
            case 'profiles':
                this.profilesComponent.createElement();
                break;
            case 'charges':
                this.chargesComponent.createChargeDialog();
                break;
            case 'contract_types':
                this.contractTypesComponent.createContractTypeDialog();
                break;
        }
    }

    public search(search_string_filter: string) {
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];

        switch (selected_tab) {
            case 'profiles':
                let filter = { first_name: search_string_filter };
                this.profilesComponent.getList(filter);
                break;
            case 'charges':
                let charges_filter = {
                    ...this.chargesComponent.filters_form.value,
                    ...{ name: search_string_filter }
                };
                this.chargesComponent.getList(charges_filter);
                break;
            case 'contract_types':
                let tools_filter = {
                    ...this.contractTypesComponent.filters_form.value,
                    ...{ name: search_string_filter }
                };
                this.contractTypesComponent.getList(tools_filter);
                break;
        }
    }

}
