import { TestBed } from '@angular/core/testing';

import { MaintenanceDashboardService } from './maintenance-dashboard.service';

describe('MaintenanceDashboardService', () => {
  let service: MaintenanceDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
