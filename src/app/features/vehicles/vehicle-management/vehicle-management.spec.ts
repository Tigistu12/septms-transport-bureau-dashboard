import { TestBed } from '@angular/core/testing';
import { VehicleService } from '../../../core/services/vehicle.service';
import { CreateVehicleDto } from '../../../core/models/vehicle.model';

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

  it('should load initial mock vehicle fleet including assigned route and status', () => {
    const vehicles = service.vehicles();
    expect(vehicles.length).toBeGreaterThan(0);

    const firstVehicle = vehicles[0];
    expect(firstVehicle.assignedRoute).toBeTruthy();
    expect(firstVehicle.status).toBeDefined();
  });

  it('should register a new vehicle with assigned route and status', () => {
    const initialCount = service.vehicles().length;

    const newVehicleDto: CreateVehicleDto = {
      plateNumber: '3-A99999',
      category: 'Minibus Taxi',
      engineType: 'Electric',
      seatingCapacity: 14,
      standingCapacity: 0,
      assignedDriverName: 'Alemayehu Tekle',
      driverLicenseNumber: 'ETH-DL-9900',
      assignedRoute: 'Megenagna - CMC',
      status: 'In Service'
    };

    service.registerVehicle(newVehicleDto);

    const updatedVehicles = service.vehicles();
    expect(updatedVehicles.length).toBe(initialCount + 1);

    const addedVehicle = updatedVehicles.find(v => v.plateNumber === '3-A99999');
    expect(addedVehicle).toBeTruthy();
    expect(addedVehicle?.assignedRoute).toBe('Megenagna - CMC');
    expect(addedVehicle?.status).toBe('In Service');
  });
});