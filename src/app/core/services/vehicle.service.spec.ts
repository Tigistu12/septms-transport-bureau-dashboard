import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from '../models/vehicle.model';

describe('VehicleManagementService', () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleService]
    });
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial mock vehicle fleet including electric minibuses', () => {
    const vehicles = service.vehicles();
    expect(vehicles.length).toBeGreaterThan(0);

    const hasVelocityBus = vehicles.some(v => v.category === 'Velocity Bus');
    expect(hasVelocityBus).toBe(true);

    const hasElectricMinibus = vehicles.some(
      v => v.category === 'Minibus Taxi' && v.engineType === 'Electric'
    );
    expect(hasElectricMinibus).toBe(true);
  });

  it('should return correct default capacities and engine configurations by category', () => {
    // Minibus Taxi defaults (supports both Diesel and Electric)
    const minibus = service.getDefaultCapacities('Minibus Taxi');
    expect(minibus.seating).toBe(14);
    expect(minibus.standing).toBe(0); // Law enforces 0 standing for Minibus
    expect(minibus.engine).toBe('Diesel/Fuel');
    expect(minibus.availableEngines).toEqual(['Diesel/Fuel', 'Electric']);

    // Velocity Bus defaults
    const velocityBus = service.getDefaultCapacities('Velocity Bus');
    expect(velocityBus.seating).toBe(40);
    expect(velocityBus.standing).toBe(20);
    expect(velocityBus.engine).toBe('Electric (Velocity)');
    expect(velocityBus.availableEngines).toEqual(['Electric (Velocity)']);

    // Anbessa Bus defaults
    const anbessaBus = service.getDefaultCapacities('Anbessa Bus');
    expect(anbessaBus.seating).toBe(30);
    expect(anbessaBus.standing).toBe(70);
  });

  it('should register a new vehicle and update reactive vehicles signal', () => {
    const initialCount = service.vehicles().length;

    const newVehicleDto: CreateVehicleDto = {
      plateNumber: '3-A99999',
      category: 'Minibus Taxi',
      engineType: 'Electric',
      seatingCapacity: 14,
      standingCapacity: 0,
      assignedDriverName: 'Alemayehu Tekle',
      driverLicenseNumber: 'ETH-DL-9900'
    };

    service.registerVehicle(newVehicleDto);

    const updatedVehicles = service.vehicles();
    expect(updatedVehicles.length).toBe(initialCount + 1);

    const addedVehicle = updatedVehicles.find(v => v.plateNumber === '3-A99999');
    expect(addedVehicle).toBeTruthy();
    expect(addedVehicle?.assignedDriverName).toBe('Alemayehu Tekle');
    expect(addedVehicle?.engineType).toBe('Electric');
    expect(addedVehicle?.compliance).toBe('Compliant');
  });
});