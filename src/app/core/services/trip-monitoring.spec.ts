import { TestBed } from '@angular/core/testing';
import { TripMonitoring } from './trip-monitoring';

describe('TripMonitoring', () => {
  let service: TripMonitoring;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripMonitoring);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
