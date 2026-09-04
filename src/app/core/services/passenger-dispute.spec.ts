import { TestBed } from '@angular/core/testing';
import { PassengerDispute } from './passenger-dispute.service';

describe('PassengerDispute', () => {
  let service: PassengerDispute;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerDispute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
