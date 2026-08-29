export type LicenseGrade = 'Public Trans Grade 1' | 'Public Trans Grade 2' | 'Public Trans Grade 3' | 'Special Heavy Duty';
export type DriverStatus = 'Active' | 'Warning' | 'Suspended' | 'Revoked';
export type OffenseCategory = 'Tariff Overcharge' | 'Overcrowding' | 'Route Deviation' | 'Reckless Driving' | 'Unlicensed Operation';

export interface ViolationRecord {
  id: string;
  offense: OffenseCategory;
  penaltyPoints: number;
  fineAmountEtb: number;
  date: string;
  location: string;
  officerNotes: string;
}

export interface Driver {
  id: string;
  fullName: string;
  faydaNationalId: string;
  licenseNumber: string;
  licenseGrade: LicenseGrade;
  assignedVehiclePlate: string;
  status: DriverStatus;
  accumulatedPoints: number;
  totalFinesPaidEtb: number;
  licenseExpiryDate: string;
  recentViolations: ViolationRecord[];
}

export interface IssueSanctionDto {
  driverId: string;
  offense: OffenseCategory;
  penaltyPoints: number;
  fineAmountEtb: number;
  location: string;
  officerNotes: string;
}