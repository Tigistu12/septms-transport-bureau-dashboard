import { TestBed } from '@angular/core/testing';
import { NavigationSidebar } from './navigation-sidebar.service';

describe('NavigationSidebar', () => {
  let service: NavigationSidebar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationSidebar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
