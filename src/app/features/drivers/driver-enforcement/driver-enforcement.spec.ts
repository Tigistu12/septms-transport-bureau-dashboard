import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverEnforcement } from './driver-enforcement';

describe('DriverEnforcement', () => {
  let component: DriverEnforcement;
  let fixture: ComponentFixture<DriverEnforcement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverEnforcement],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverEnforcement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
