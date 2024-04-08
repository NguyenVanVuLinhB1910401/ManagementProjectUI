import { TestBed } from '@angular/core/testing';

import { AttachmentFileService } from './attachment-file.service';

describe('AttachmentFileService', () => {
  let service: AttachmentFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachmentFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
