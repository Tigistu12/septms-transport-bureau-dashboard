import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerDispute } from './passenger-dispute';

describe('PassengerDispute', () => {
  let component: PassengerDispute;
  let fixture: ComponentFixture<PassengerDispute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerDispute],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerDispute);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
