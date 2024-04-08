import { TestBed } from '@angular/core/testing';

import { BuocThucHienService } from './buoc-thuc-hien.service';

describe('BuocThucHienService', () => {
  let service: BuocThucHienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuocThucHienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
