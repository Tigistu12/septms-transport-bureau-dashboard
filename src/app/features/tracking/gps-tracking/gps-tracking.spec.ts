import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GpsTracking } from './gps-tracking';

describe('GpsTracking', () => {
  let component: GpsTracking;
  let fixture: ComponentFixture<GpsTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpsTracking],
    }).compileComponents();

    fixture = TestBed.createComponent(GpsTracking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
