import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerDisputeComponent } from './passenger-dispute';

describe('PassengerDispute', () => {
  let component: PassengerDisputeComponent;
  let fixture: ComponentFixture<PassengerDisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerDisputeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerDisputeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
