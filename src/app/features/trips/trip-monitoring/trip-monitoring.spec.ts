import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripMonitoring } from './trip-monitoring';

describe('TripMonitoring', () => {
  let component: TripMonitoring;
  let fixture: ComponentFixture<TripMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripMonitoring],
    }).compileComponents();

    fixture = TestBed.createComponent(TripMonitoring);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
