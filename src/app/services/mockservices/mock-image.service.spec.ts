import { TestBed } from '@angular/core/testing';

import { MockImageService } from './mock-image.service';

describe('MockImageService', () => {
  let service: MockImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
