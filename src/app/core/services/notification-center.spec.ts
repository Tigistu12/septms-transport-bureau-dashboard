import { TestBed } from '@angular/core/testing';
import { NotificationCenter } from './notification-center';

describe('NotificationCenter', () => {
  let service: NotificationCenter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationCenter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
