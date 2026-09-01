import { TestBed } from '@angular/core/testing';
import { TariffManagement } from './tariff-management.service';

describe('TariffManagement', () => {
  let service: TariffManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TariffManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
