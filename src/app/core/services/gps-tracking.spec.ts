import { TestBed } from '@angular/core/testing';
import { GpsTracking } from './gps-tracking';

describe('GpsTracking', () => {
  let service: GpsTracking;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpsTracking);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
