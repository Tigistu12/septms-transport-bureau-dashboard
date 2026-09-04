import { TestBed } from '@angular/core/testing';
import { PassengerQueue } from './passenger-queue';

describe('PassengerQueue', () => {
  let service: PassengerQueue;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerQueue);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
