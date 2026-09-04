import { TestBed } from '@angular/core/testing';
import { DriverPenalty } from './driver-penalty.service';

describe('DriverPenalty', () => {
  let service: DriverPenalty;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverPenalty);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
