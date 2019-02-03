import { Injectable } from '@angular/core';
import { Subject, of as observableOf } from 'rxjs';

export class SidenavActions {
    public search: boolean;
    public add: boolean;
    public delete: boolean;

    public constructor(options: Array<'search' | 'add' | 'delete'> = []) {
        this.search = options.indexOf('search') !== -1;
        this.add = options.indexOf('add') !== -1;
        this.delete = options.indexOf('delete') !== -1;
    }

    public useSearch(): this {
        this.search = true;

        return this;
    }

    public useAdd(): this {
        this.add = true;

        return this;
    }

    public useDelete(): this {
        this.delete = true;

        return this;
    }
}

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
    public actions: Subject<SidenavActions> = new Subject();
}
