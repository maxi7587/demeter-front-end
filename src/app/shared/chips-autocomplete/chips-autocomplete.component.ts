import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss']
})
export class ChipsAutocompleteComponent implements OnInit {

    @ViewChild('chipsAutocompleteInput') chipsAutocompleteInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    @Input() placeholder: string;
    @Input() options: Array<string> = [];
    @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

    public selectable: true;
    public removeable: true;
    public search_form = new FormGroup({
        search: new FormControl('')
    });
    public selected_options: [];
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

    public add(event: MatChipInputEvent): void {
        // Add fruit only when MatAutocomplete is not open
        // To make sure this does not conflict with OptionSelected Event
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            // Add our fruit
            // if ((value || '').trim()) {
            //     this.selected_options.push(value.trim());
            // }
            console.log('value ---------------------->', value);

            // Reset the input value
            if (input) {
                input.value = '';
            }

            this.search_form.controls.search.setValue(null);
        }
    }

}
