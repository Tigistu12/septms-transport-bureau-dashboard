import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerPayment } from './passenger-payment';

describe('PassengerPayment', () => {
  let component: PassengerPayment;
  let fixture: ComponentFixture<PassengerPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerPayment],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerPayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
