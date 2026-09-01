import { VehicleCategory } from './vehicle.model';

export type ViolationType = 
  | 'Tariff Overcharging' 
  | 'Route Deviation' 
  | 'Overcapacity Loading' 
  | 'Unauthorized Terminal Departure' 
  | 'Expired Inspection';

export type EnforcementStatus = 'Open' | 'Under Review' | 'Fine Issued' | 'Resolved' | 'Appealed';

export interface ViolationRecord {
  id: string;
  plateNumber: string;
  driverLicenseNumber: string;
  driverName: string;
  category: VehicleCategory;
  violationType: ViolationType;
  fineAmountEtb: number;
  demeritPoints: number;
  locationName: string;
  reportedAt: string;
  status: EnforcementStatus;
  officerBadgeNumber: string;
  notes?: string;
}

export interface IssueViolationDto {
  plateNumber: string;
  driverLicenseNumber: string;
  driverName: string;
  category: VehicleCategory;
  violationType: ViolationType;
  fineAmountEtb: number;
  demeritPoints: number;
  locationName: string;
  officerBadgeNumber: string;
  notes?: string;
}