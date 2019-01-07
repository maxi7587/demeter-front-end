import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    private _sections: Array<{ key: string; name: string; icon?: string }> = [
        { key: 'dashboard', name: 'Escritorio' },
        { key: 'profiles', name: 'Perfiles' },
        { key: 'fields', name: 'Campos' }
    ];
    get sections(): Array<{ key: string; name: string; icon?: string }> { return this._sections; }
    private _route_data: {[key: string]: any};
    set route_data(data: {[key: string]: any}) { this._route_data = data; }
    get route_data(): {[key: string]: any} { return this._route_data; }

    constructor(public router: Router, public activatedRoute: ActivatedRoute) {
        console.log('inside navigation component');
        activatedRoute.data.subscribe(data => {
            this.route_data = data;
            console.log(this.route_data);
        });
    }

    public ngOnInit() {
    }

    public goToSection(section) {
        this.router.navigate([section], { relativeTo: this.activatedRoute });
    }

}
