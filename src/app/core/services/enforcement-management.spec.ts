import { TestBed } from '@angular/core/testing';
import { EnforcementManagement } from './enforcement-management';

describe('EnforcementManagement', () => {
  let service: EnforcementManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnforcementManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
