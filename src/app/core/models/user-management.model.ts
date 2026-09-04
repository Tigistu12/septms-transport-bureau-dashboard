export type UserRole = 
  | 'BUREAU_ADMIN' 
  | 'TRANSPORT_INSPECTOR' 
  | 'QUEUE_MARSHAL' 
  | 'FINANCE_AUDITOR' 
  | 'OPERATOR_MANAGER';

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING_APPROVAL';

export interface BureauUser {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  assignedZone: string;
  status: UserStatus;
  lastLogin: string;
}