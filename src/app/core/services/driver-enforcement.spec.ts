import { TestBed } from '@angular/core/testing';
import { DriverEnforcement } from './driver-enforcement';

describe('DriverEnforcement', () => {
  let service: DriverEnforcement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverEnforcement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
