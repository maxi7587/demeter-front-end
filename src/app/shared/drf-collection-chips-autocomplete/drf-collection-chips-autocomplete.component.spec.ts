import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrfCollectionAutocompleteComponent } from './drf-collection-autocomplete.component';

describe('DrfCollectionAutocompleteComponent', () => {
  let component: DrfCollectionAutocompleteComponent;
  let fixture: ComponentFixture<DrfCollectionAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrfCollectionAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrfCollectionAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
