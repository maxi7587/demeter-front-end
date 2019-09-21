import { TestBed } from '@angular/core/testing';

import { SupplyTransactionsService } from './supply-transactions.service';

describe('SupplyTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplyTransactionsService = TestBed.get(SupplyTransactionsService);
    expect(service).toBeTruthy();
  });
});
