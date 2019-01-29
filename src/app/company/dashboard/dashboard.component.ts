import { Component, OnInit } from '@angular/core';
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

    public constructor(protected router: Router, public activatedRoute: ActivatedRoute) {
        console.log('inside dashboard component');
    }

    ngOnInit() {
    }

    public goToSection(section: string) {
        this.router.navigate(['..', section], { relativeTo: this.activatedRoute });
    }

}
