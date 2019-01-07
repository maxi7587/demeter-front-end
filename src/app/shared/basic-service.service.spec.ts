import { TestBed } from '@angular/core/testing';

import { BasicDRFService } from './basic-drf.service';

describe('BasicDRFService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicDRFService = TestBed.get(BasicDRFService);
    expect(service).toBeTruthy();
  });
});
