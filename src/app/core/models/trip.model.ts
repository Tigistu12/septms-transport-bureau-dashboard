import { VehicleCategory } from './vehicle.model';

export type TripStatus = 'Scheduled' | 'In Transit' | 'Completed' | 'Delayed' | 'Cancelled';

export interface RouteStage {
  stageName: string;
  tariffEtb: number;
}

export interface Trip {
  id: string;
  routeCode: string;
  origin: string;
  destination: string;
  category: VehicleCategory;
  assignedPlateNumber: string;
  driverName: string;
  scheduledDepartureTime: string;
  actualDepartureTime?: string;
  estimatedArrivalTime: string;
  status: TripStatus;
  currentPassengerCount: number;
  totalCapacity: number;
  routeStages: RouteStage[];
}

export interface DispatchTripDto {
  routeCode: string;
  origin: string;
  destination: string;
  category: VehicleCategory;
  assignedPlateNumber: string;
  driverName: string;
  scheduledDepartureTime: string;
  estimatedArrivalTime: string;
  totalCapacity: number;
  baseTariffEtb: number;
}