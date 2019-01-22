import { TestBed } from '@angular/core/testing';

import { SampleCaseService } from './sample-case.service';

describe('SampleCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SampleCaseService = TestBed.get(SampleCaseService);
    expect(service).toBeTruthy();
  });
});
