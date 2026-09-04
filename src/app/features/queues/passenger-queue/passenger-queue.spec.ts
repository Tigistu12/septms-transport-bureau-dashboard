import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerQueue } from './passenger-queue';

describe('PassengerQueue', () => {
  let component: PassengerQueue;
  let fixture: ComponentFixture<PassengerQueue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerQueue],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerQueue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
