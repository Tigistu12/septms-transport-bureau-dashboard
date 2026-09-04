import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverPenalty } from './driver-penalty';

describe('DriverPenalty', () => {
  let component: DriverPenalty;
  let fixture: ComponentFixture<DriverPenalty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverPenalty],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverPenalty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
