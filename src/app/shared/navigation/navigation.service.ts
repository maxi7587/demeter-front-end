import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
}
