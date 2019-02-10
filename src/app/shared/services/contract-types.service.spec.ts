import { TestBed } from '@angular/core/testing';

import { ContractTypesService } from './contract-type.service';

describe('ContractTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractTypesService = TestBed.get(ContractTypesService);
    expect(service).toBeTruthy();
  });
});
