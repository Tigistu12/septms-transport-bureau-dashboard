import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnforcementManagement } from './enforcement-management';

describe('EnforcementManagement', () => {
  let component: EnforcementManagement;
  let fixture: ComponentFixture<EnforcementManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnforcementManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(EnforcementManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
