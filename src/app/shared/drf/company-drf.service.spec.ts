import { TestBed } from '@angular/core/testing';

import { CompanyDrfService } from './company-drf.service';

describe('CompanyDrfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyDrfService = TestBed.get(CompanyDrfService);
    expect(service).toBeTruthy();
  });
});
