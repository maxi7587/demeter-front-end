import { TestBed } from '@angular/core/testing';

import { FieldElementsService } from './field-elements.service';

describe('FieldElementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldElementsService = TestBed.get(FieldElementsService);
    expect(service).toBeTruthy();
  });
});
