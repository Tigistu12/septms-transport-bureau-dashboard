import { TestBed } from '@angular/core/testing';
import { FleetMonitoring } from './fleet-monitoring.service';

describe('FleetMonitoring', () => {
  let service: FleetMonitoring;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetMonitoring);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
