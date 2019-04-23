import { Injectable } from '@angular/core';
import { Subject, of as observableOf } from 'rxjs';

export class SidenavActions {
    public search: boolean;
    public add: boolean;
    public delete: boolean;
    public save: boolean;
    public cancel: boolean;
    public menu: boolean;

    public constructor(options: Array<'search' | 'add' | 'delete' | 'save' | 'cancel' | 'menu'> = []) {
        this.search = options.indexOf('search') !== -1;
        this.add = options.indexOf('add') !== -1;
        this.delete = options.indexOf('delete') !== -1;
        this.save = options.indexOf('save') !== -1;
        this.cancel = options.indexOf('cancel') !== -1;
        this.menu = options.indexOf('menu') !== -1;
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

    public useSave(): this {
        this.save = true;

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
    public title: string;
    public sidenav_links: Subject<Array<NavigationSidenavLink>> = new Subject();
    public actions: Subject<SidenavActions> = new Subject();
    public actionClick: Subject<string> = new Subject<string>();
    public search_filter: string;
}
