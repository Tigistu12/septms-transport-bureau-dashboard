import { TestBed } from '@angular/core/testing';
// import { TripMonitoring } from './trip-monitoring';
import { TripMonitoringService } from './trip-monitoring.service';


describe('TripMonitoring', () => {
  let service: TripMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
