import { VehicleCategory } from './vehicle.model';

export type PenaltyReason = 
  | 'TARIFF_OVERCHARGE' 
  | 'UNANNOUNCED_SURGE' 
  | 'ROUTE_DEVIATION' 
  | 'REFUSAL_TO_SERVE' 
  | 'QUEUE_DISRUPTION';

export type FineStatus = 'UNPAID' | 'PAID' | 'DISPUTED' | 'SUSPENDED_LICENSE';

export interface DriverPenalty {
  penaltyId: string;
  driverName: string;
  driverLicenseNumber: string;
  vehiclePlate: string;
  category: VehicleCategory;
  reason: PenaltyReason;
  fineAmountEtb: number;
  pointsDeducted: number;
  issuedAt: string;
  dueDate: string;
  status: FineStatus;
  issuedByInspector: string;
}