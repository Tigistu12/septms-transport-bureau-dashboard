import { VehicleCategory } from './vehicle.model';

export type QueueUrgencyLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface TerminalQueue {
  id: string;
  terminalName: string;
  targetDestination: string;
  category: VehicleCategory;
  waitingPassengers: number;
  estWaitTimeMinutes: number;
  availableVehiclesInBay: number;
  urgency: QueueUrgencyLevel;
  lastUpdated: string;
}

export interface QueueReinforcementRequest {
  id: string;
  terminalName: string;
  targetDestination: string;
  requestedVehiclesCount: number;
  category: VehicleCategory;
  urgency: QueueUrgencyLevel;
  status: 'Pending' | 'Approved' | 'Dispatched' | 'Rejected';
  requestedAt: string;
  notes?: string;
}