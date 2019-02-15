import { TestBed } from '@angular/core/testing';

import { WebsService } from './webs.service';

describe('WebsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsService = TestBed.get(WebsService);
    expect(service).toBeTruthy();
  });
});
