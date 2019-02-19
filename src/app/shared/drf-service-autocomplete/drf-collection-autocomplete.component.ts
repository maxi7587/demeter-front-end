import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BasicDRFService, DRFCollection, DRFResource } from 'src/app/shared/basic-drf.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-drf-collection-autocomplete',
  templateUrl: './drf-collection-autocomplete.component.html',
  styleUrls: ['./drf-collection-autocomplete.component.scss']
})
export class DrfCollectionAutocompleteComponent implements OnInit {

    @Input() service: BasicDRFService<any>;
    @Input() search_field: string;
    @Input() filters: {[key: string]: any};
    @Input() placeholder: string;
    @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

    public search_form = new FormGroup({
        search: new FormControl('')
    });
    public collection: DRFCollection<DRFResource>;
    public filteredOptions: Observable<Array<DRFResource>>;

    public constructor() { }

    public ngOnInit() {
        this.service
            .all()
            .subscribe(
                collection => {
                    console.log(collection);
                    this.collection = collection;
                }
            );
        this.filteredOptions = this.search_form.controls.search.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    private _filter(value: string): Array<DRFResource> {
        const filterValue = value.toLowerCase();

        return this.collection.results.filter(option => option[this.search_field].toLowerCase().includes(filterValue));
    }

}
