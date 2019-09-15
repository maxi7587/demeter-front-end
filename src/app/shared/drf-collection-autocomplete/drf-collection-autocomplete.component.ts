import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BasicDRFService, DRFCollection, DRFResource } from 'src/app/shared/basic-drf.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-drf-collection-autocomplete',
  templateUrl: './drf-collection-autocomplete.component.html',
  styleUrls: ['./drf-collection-autocomplete.component.scss']
})
export class DrfCollectionAutocompleteComponent implements OnInit, OnChanges {
    @ViewChild('auto') public autocomplete: MatAutocomplete;

    @Input() service: BasicDRFService<any>;
    @Input() disabled: boolean;
    @Input() searchField: string;
    @Input() filters: {[key: string]: any};
    @Input() placeholder = 'Buscar';
    @Input() activeOption: DRFResource;
    @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

    public search_form = new FormGroup({
        search: new FormControl('')
    });
    public collection: DRFCollection<DRFResource>;
    public filteredOptions: Observable<Array<DRFResource>>;

    public constructor() { }

    public ngOnInit() {
        if (this.activeOption) {
            this.search_form.controls.search.setValue(this.activeOption);
        }
        this.getCollection();
        this.filteredOptions = this.search_form.controls.search.valueChanges
            .pipe(
                startWith(''),
                map(
                    value => {
                        if (typeof value !== 'string') { return [value]; }
                        return this._filter(value);
                    }
                )
            );
        if (this.disabled) {
            this.search_form.disable();
        }
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
                    console.log('collection ------>', this.collection);
                    this.collection = collection;
                    this.filteredOptions = this.search_form.controls.search.valueChanges
                        .pipe(
                            startWith(''),
                            map(
                                value => {
                                    if (typeof value !== 'string') { return [value]; }
                                    return this._filter(value);
                                }
                            )
                        );
                }
            );
    }

    public displayWith = (element: DRFResource) => {
        return element[this.searchField];
    }

    private _filter(value: string): Array<DRFResource> {
        let filterValue = value.toLowerCase();

        return this.collection.results.filter(option => option[this.searchField].toLowerCase().includes(filterValue));
    }

}
