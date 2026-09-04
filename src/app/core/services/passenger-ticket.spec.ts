import { TestBed } from '@angular/core/testing';
import { PassengerTicket } from './passenger-ticket.service';

describe('PassengerTicket', () => {
  let service: PassengerTicket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerTicket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
