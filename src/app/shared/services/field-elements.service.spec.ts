import { TestBed } from '@angular/core/testing';

import { FieldRowsService } from './field-rows.service';

describe('FieldRowsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldRowsService = TestBed.get(FieldRowsService);
    expect(service).toBeTruthy();
  });
});
