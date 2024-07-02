import { TestBed } from '@angular/core/testing';

import { CustomProgramService } from './custom-program.service';

describe('CustomProgramService', () => {
  let service: CustomProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
