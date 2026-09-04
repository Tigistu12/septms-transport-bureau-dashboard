import { TestBed } from '@angular/core/testing';
import { SystemAnalytics } from './system-analytics.service';

describe('SystemAnalytics', () => {
  let service: SystemAnalytics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAnalytics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
