import { Injectable } from '@angular/core';
import { Subject, of as observableOf } from 'rxjs';

export class NavigationSidenavLink {
    public text: string;
    public section: string;
    public icon: string;

    public constructor(text: string, section: string, icon: string) {
        this.text = text;
        this.section = section;
        this.icon = icon;
    }
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
    public sidenav_links: Subject<Array<NavigationSidenavLink>> = new Subject();
    public actions: Subject<{ search: boolean; add: boolean: delete: boolean}> = new Subject<{ search: boolean; add: boolean: delete: boolean}>()>
}
