export type VehicleCategory =
  | 'Minibus Taxi'
  | 'Anbessa Bus'
  | 'Sheger Bus'
  | 'Velocity Bus'
  | 'Midi-Bus';

export type EngineType = 'Diesel/Fuel' | 'Electric (Velocity)' | 'Electric';
export type ComplianceStatus = 'Compliant' | 'Inspection Due' | 'Suspended';
export type VehicleOperationalStatus = 'In Service' | 'Out of Service' | 'Maintenance';

export interface Vehicle {
  id: string;
  plateNumber: string;
  category: VehicleCategory;
  engineType: EngineType;
  seatingCapacity: number;
  standingCapacity: number;
  assignedDriverName: string;
  driverLicenseNumber: string;
  compliance: ComplianceStatus;
  lastInspection: string;
  assignedRoute: string;
  status: VehicleOperationalStatus;
}

export interface CreateVehicleDto {
  plateNumber: string;
  category: VehicleCategory;
  engineType: EngineType;
  seatingCapacity: number;
  standingCapacity: number;
  assignedDriverName: string;
  driverLicenseNumber: string;
  assignedRoute: string;
  status: VehicleOperationalStatus;
}