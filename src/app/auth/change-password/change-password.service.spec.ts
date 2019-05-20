import { TestBed } from '@angular/core/testing';

import { CahngePasswordService } from './cahnge-password.service';

describe('CahngePasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CahngePasswordService = TestBed.get(CahngePasswordService);
    expect(service).toBeTruthy();
  });
});
