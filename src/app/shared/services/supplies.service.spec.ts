import { TestBed } from '@angular/core/testing';

import { SupplyService } from './supplies.service';

describe('SupplyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplyService = TestBed.get(SupplyService);
    expect(service).toBeTruthy();
  });
});
