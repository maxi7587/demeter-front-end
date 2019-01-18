import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

    @Input() placeholder: string;
    @Input() options: Array<string> = [];
    @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

    public search_form = new FormGroup({
        search: new FormControl('')
    });
    public filteredOptions: Observable<string[]>;

    public constructor() { }

    public ngOnInit() {
        this.filteredOptions = this.search_form.controls.search.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

}
