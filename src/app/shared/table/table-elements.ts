import { Pipe, TemplateRef } from '@angular/core';

export interface IColumnPipe {
    pipe: Pipe;
    arg?: any;
    content_key_arg?: string;
}

export class Column {
    private _key: string;
    set key(key: string) { this._key = key; }
    get key(): string { return this._key; }
    private _title: string;
    set title(title: string) { this._title = title; }
    get title(): string { return this._title; }
    private _avatar: string;
    set avatar(avatar: string) { this._avatar = avatar; }
    get avatar(): string { return this._avatar; }
    private _icon: string;
    set icon(icon: string) { this._icon = icon; }
    get icon(): string { return this._icon; }
    private _align: string;
    set align(align: string) { this._align = align; }
    get align(): string { return this._align; }
    private _pipe: Pipe;
    set pipe(pipe: Pipe) { this._pipe = pipe; }
    get pipe(): Pipe { return this._pipe; }
    private _template: TemplateRef<any>;
    set template(template: TemplateRef<any>) { this._template = template; }
    get template(): TemplateRef<any> { return this._template; }

    public constructor(key: string, title: string, avatar?: string, icon?: string, align?: string, pipe?: Pipe) {
        this.key = key;
        this.title = title;
        this.avatar = avatar;
        this.icon = icon;
        this.align = align;
        this.pipe = pipe;
    }

    public setPipe(pipe: Pipe): this {
        this.pipe = pipe;

        return this;
    }

    public setTemplate(template: TemplateRef<any>): this {
        this.template = template;

        return this;
    }

    public accessNestedProperty(resource, nested_property_string) {
        nested_property_string = nested_property_string.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        nested_property_string = nested_property_string.replace(/^\./, '');           // strip a leading dot
        let properties = nested_property_string.split('.');
        for (let i = 0, n = properties.length; i < n; ++i) {
            let property = properties[i];
            if (property in resource) {
                resource = resource[property];
            } else {
                return;
            }
        }
        return resource;
    }
}
