import { TestBed } from '@angular/core/testing';

import { TaskTypesService } from './task-types.service';

describe('TaskTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskTypesService = TestBed.get(TaskTypesService);
    expect(service).toBeTruthy();
  });
});
