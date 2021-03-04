import { TestBed } from '@angular/core/testing';

import { EateriesService } from './eateries.service';

describe('EateriesService', () => {
  let service: EateriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EateriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
