import { TestBed } from '@angular/core/testing';

import { QuyTrinhService } from './quy-trinh.service';

describe('QuyTrinhService', () => {
  let service: QuyTrinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuyTrinhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
