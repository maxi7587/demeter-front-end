import { Component, OnInit } from '@angular/core';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Field, FieldsService } from 'src/app/shared/services/fields.service';
import { NavigationService, SidenavActions } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public links = [
        {
            text: 'Staff',
            section: 'profiles',
            icon: 'account_circle'
        },
        {
            text: 'Fields',
            section: 'fields',
            icon: 'wb_sunny'
        },
        {
            text: 'Tasks',
            section: 'tasks',
            icon: 'assignment'
        },
        {
            text: 'Tools',
            section: 'tools',
            icon: 'build'
        }
    ];
    public fields: DRFCollection<Field>;

    public constructor(
        protected router: Router,
        public activatedRoute: ActivatedRoute,
        public fieldsService: FieldsService,
        public navigationService: NavigationService
    ) {
        console.log('inside dashboard component');
        this.fieldsService.all()
            .subscribe(
                (fields: DRFCollection<Field>) => this.fields = fields
            );
    }

    ngOnInit() {
        this.navigationService.actions.next(new SidenavActions());
    }

    public goToSection(section: string) {
        this.router.navigate(['..', section], { relativeTo: this.activatedRoute });
    }

    public goToField(field: Field) {
        this.router.navigate(['..', 'fields', field.id], { relativeTo: this.activatedRoute });
    }

}
