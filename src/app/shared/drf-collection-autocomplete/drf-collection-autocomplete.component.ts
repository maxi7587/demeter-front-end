import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
export class DrfCollectionAutocompleteComponent implements OnInit {
    @ViewChild('matAutocomplete') public autocomplete: MatAutocomplete;

    @Input() service: BasicDRFService<any>;
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
        this.service
            .all()
            .subscribe(
                collection => {
                    this.collection = collection;
                    console.log('collection ------>', this.collection);
                }
            );
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

    public displayWith = (element: DRFResource) => {
        return element[this.searchField];
    }

    private _filter(value: string): Array<DRFResource> {
        let filterValue = value.toLowerCase();

        return this.collection.results.filter(option => option[this.searchField].toLowerCase().includes(filterValue));
    }

}
