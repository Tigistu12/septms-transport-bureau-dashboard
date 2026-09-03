import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetMonitoring } from './fleet-monitoring';

describe('FleetMonitoring', () => {
  let component: FleetMonitoring;
  let fixture: ComponentFixture<FleetMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetMonitoring],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetMonitoring);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
