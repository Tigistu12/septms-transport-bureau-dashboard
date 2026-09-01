import { TestBed } from '@angular/core/testing';
import { PassengerPayment } from './passenger-payment.service';

describe('PassengerPayment', () => {
  let service: PassengerPayment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerPayment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
