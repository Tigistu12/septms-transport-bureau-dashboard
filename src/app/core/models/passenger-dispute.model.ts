import { VehicleCategory } from './vehicle.model';

export type DisputeType = 'OVERCHARGE' | 'REFUSAL_TO_BOARD' | 'UNANNOUNCED_SURGE' | 'DRIVER_MISCONDUCT';
export type DisputeStatus = 'PENDING' | 'UNDER_INVESTIGATION' | 'RESOLVED_REFUNDED' | 'REJECTED';

export interface PassengerDispute {
  disputeId: string;
  passengerName: string;
  passengerPhone: string;
  vehiclePlate: string;
  driverLicenseNumber: string;
  category: VehicleCategory;
  disputeType: DisputeType;
  officialFareEtb: number;
  chargedFareEtb: number;
  excessAmountEtb: number;
  incidentLocation: string;
  incidentTimestamp: string;
  status: DisputeStatus;
  description: string;
  assignedInspector?: string;
}