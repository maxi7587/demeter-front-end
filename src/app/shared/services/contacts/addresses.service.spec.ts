import { TestBed } from '@angular/core/testing';

import { AdressesService } from './adresses.service';

describe('AdressesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdressesService = TestBed.get(AdressesService);
    expect(service).toBeTruthy();
  });
});
