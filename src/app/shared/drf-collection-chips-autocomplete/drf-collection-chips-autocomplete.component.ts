import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BasicDRFService, DRFCollection, DRFResource } from 'src/app/shared/basic-drf.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-drf-collection-chips-autocomplete',
  templateUrl: './drf-collection-chips-autocomplete.component.html',
  styleUrls: ['./drf-collection-chips-autocomplete.component.scss']
})
export class DrfCollectionChipsAutocompleteComponent implements OnInit, OnChanges {
    @ViewChild('auto') public autocomplete: MatAutocomplete;
    @ViewChild('chipsAutocompleteInput') chipsAutocompleteInput: ElementRef<HTMLInputElement>;

    @Input() service: BasicDRFService<any>;
    @Input() searchField: string;
    @Input() filters: {[key: string]: any};
    @Input() placeholder = 'Buscar';
    @Input() activeOptions: Array<DRFResource>;
    @Input() disabled: boolean;
    @Output() selectedOptions: EventEmitter<Array<DRFResource>> = new EventEmitter<Array<DRFResource>>();

    public addOnBlur = true;
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public selectable = true;
    public removable = true;
    public search_form = new FormGroup({
        search: new FormControl('')
    });
    public collection: DRFCollection<DRFResource>;
    public filteredOptions: Observable<Array<DRFResource>>;

    public constructor() { }

    public ngOnInit() {
        // if (this.activeOptions) {
        //     this.search_form.controls.search.setValue(this.activeOptions);
        // }
        console.log('CHIPS autocomplete activeOptions --->', this.activeOptions);
        // this.service
        //     .all(undefined, undefined, this.filters)
        //     .subscribe(
        //         collection => {
        //             this.collection = collection;
        //             console.log('collection ------>', this.collection);
        //         }
        //     );
        // this.filteredOptions = this.search_form.controls.search.valueChanges
        //     .pipe(
        //         startWith(''),
        //         map(
        //             value => {
        //                 if (!value) {
        //                     value = '';
        //                 }
        //                 if (typeof value !== 'string') {
        //                     return [value];
        //                 }
        //                 return this._filter(value);
        //             }
        //         )
        //     );
        this.getCollection();
    }

    public ngOnChanges(changes) {
        console.log('changes --------->', changes);
        if (changes.filters) {
            console.log('changes.filters .....', changes.filters);
            this.getCollection();
        }
    }

    public getCollection() {
        this.service
            .all(undefined, undefined, this.filters)
            .subscribe(
                collection => {
                    this.collection = collection;
                    console.log('collection ------>', this.collection);
                    this.filteredOptions = this.search_form.controls.search.valueChanges
                        .pipe(
                            startWith(''),
                            map(
                                value => {
                                    if (!value) {
                                        value = '';
                                    }
                                    if (typeof value !== 'string') {
                                        return [value];
                                    }
                                    return this._filter(value);
                                }
                            )
                        );
                }
            );
    }

    public displayWith = (element: DRFResource) => {
        console.log('fails in displayWith ------>', element);
        console.log(element[this.searchField]);

        return element[this.searchField];
    }

    private _filter(value: string): Array<DRFResource> {
        if (value === '') {
            return this.collection.results;
        }
        let filterValue = value.toLowerCase();
        console.log('fails in _filter ------>', this.collection);
        console.log(this.collection.results.filter(option => option[this.searchField].toLowerCase().includes(filterValue)));

        return this.collection.results.filter(option => option[this.searchField].toLowerCase().includes(filterValue));
    }

    public add(event: MatChipInputEvent): void {
        // Add fruit only when MatAutocomplete is not open
        // To make sure this does not conflict with OptionSelected Event
        console.log('autocomplete ------------------->', this.autocomplete);
        console.log('autocomplete is OPEN? ------------------->', this.autocomplete.isOpen);
        if (!this.autocomplete.isOpen) {
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
        console.log('after add');
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        console.log('fails in selected ------>', event);
        // console.log(this.collection.results.find(
        //     option => option[this.searchField].toLowerCase().includes(event.option.viewValue)
        // ));
        // let selected_resource = this.collection.results.find(
        //     option => option[this.searchField].toLowerCase().includes(event.option.viewValue)
        // );
        console.log('fails in selected ------>', event.option.value);
        let selected_resource = event.option.value;
        this.activeOptions.push(selected_resource);
        this.selectedOptions.emit(this.activeOptions);
        this.chipsAutocompleteInput.nativeElement.value = '';
        this.search_form.controls.search.setValue(null);
    }

    remove(option: DRFResource): void {
        const index = this.activeOptions.indexOf(option);

        if (index >= 0) {
            this.activeOptions.splice(index, 1);
        }
    }

}
