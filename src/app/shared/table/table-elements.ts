import { Pipe } from '@angular/core';

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
    private _pipe: Pipe;
    set pipe(pipe: Pipe) { this._pipe = pipe; }
    get pipe(): Pipe { return this._pipe; }

    public constructor(key: string, title: string, pipe?: Pipe) {
        this.key = key;
        this.title = title;
        this.pipe = pipe;
    }
}
