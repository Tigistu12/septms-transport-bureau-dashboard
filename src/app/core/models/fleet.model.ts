import { VehicleCategory } from './vehicle.model';

export type CongestionLevel = 'Normal' | 'Moderate' | 'Heavy' | 'Critical';
export type TerminalQueueStatus = 'Optimal' | 'High Demand' | 'Overcrowded';

export type ReinforcementDispatchStatus =
  | 'Pending'
  | 'Accepted'
  | 'Declined'
  | 'En Route'
  | 'Completed'
  | 'Cancelled';

export interface AvailableDriverOption {
  driverId: string;
  driverName: string;
  vehiclePlate: string;
  category: VehicleCategory;
  currentLocation: string;
  isAvailable: boolean;
}

export interface TerminalMetrics {
  id: string;
  terminalName: string;
  activeVehiclesInQueue: number;
  waitingPassengersCount: number;
  avgWaitTimeMinutes: number;
  status: TerminalQueueStatus;
}

export interface RouteTelemetry {
  id: string;
  routeCode: string;
  routeName: string;
  category: VehicleCategory;
  activeVehiclesOnRoute: number;
  avgSpeedKmh: number;
  congestion: CongestionLevel;
  lastUpdated: string;
}

export interface ReinforcementDispatch {
  id: string;
  terminalName: string;
  routeCode: string;
  driverId: string;
  driverName: string;
  vehiclePlate: string;
  category: VehicleCategory;
  status: ReinforcementDispatchStatus;
  declineReason?: string;
  dispatchedAt: string;
  respondedAt?: string;
}

export interface CreateReinforcementDispatchDto {
  terminalName: string;
  routeCode: string;
  driverId: string;
  category: VehicleCategory;
  priorityNote?: string;
}