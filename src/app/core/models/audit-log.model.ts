export type AuditActionCategory = 
  | 'TARIFF_CHANGE' 
  | 'DRIVER_PENALTY' 
  | 'USER_ACCESS' 
  | 'SYSTEM_DISPATCH' 
  | 'PAYMENT_RECONCILIATION';

export type AuditSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AuditLogEntry {
  auditId: string;
  timestamp: string;
  performedBy: string;
  userRole: string;
  actionCategory: AuditActionCategory;
  actionDescription: string;
  targetEntityId: string;
  ipAddress: string;
  severity: AuditSeverity;
}