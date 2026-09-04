import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverPenaltyComponent } from './driver-penalty';

describe('DriverPenalty', () => {
  let component: DriverPenaltyComponent;
  let fixture: ComponentFixture<DriverPenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverPenaltyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverPenaltyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
