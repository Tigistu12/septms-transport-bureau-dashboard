import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerTicket } from './passenger-ticket';

describe('PassengerTicket', () => {
  let component: PassengerTicket;
  let fixture: ComponentFixture<PassengerTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
