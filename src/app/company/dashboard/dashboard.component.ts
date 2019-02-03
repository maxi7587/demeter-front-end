import { Component, OnInit } from '@angular/core';
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
            text: 'Perfiles',
            section: 'profiles',
            icon: 'account_circle'
        },
        {
            text: 'Campos',
            section: 'fields',
            icon: 'wb_sunny'
        },
        {
            text: 'Tareas',
            section: 'tasks',
            icon: 'assignment'
        },
        {
            text: 'Herramientas',
            section: 'tools',
            icon: 'build'
        }
    ];

    public constructor(
        protected router: Router,
        public activatedRoute: ActivatedRoute,
        public navigationService: NavigationService
    ) {
        console.log('inside dashboard component');
    }

    ngOnInit() {
        this.navigationService.actions.next(new SidenavActions());
    }

    public goToSection(section: string) {
        this.router.navigate(['..', section], { relativeTo: this.activatedRoute });
    }

}
