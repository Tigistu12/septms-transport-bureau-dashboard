export interface SystemConfiguration {
  telematicsRefreshIntervalSeconds: number;
  autoDispatchReinforcementThreshold: number; // Passenger queue size that triggers alert
  overchargePenaltyMultiplier: number; // Penalty factor for illegal fare surges
  maxDriverShiftHours: number;
  enableTelebirrAutoSettlement: boolean;
  enableCbeBirrAutoSettlement: boolean;
  enforcementGracePeriodMinutes: number;
}

export type AuditActionType =
  | 'TARIFF_UPDATE'
  | 'REINFORCEMENT_DISPATCH'
  | 'PENALTY_ISSUED'
  | 'DRIVER_SUSPENSION'
  | 'SYSTEM_CONFIG_CHANGE';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminUser: string;
  actionType: AuditActionType;
  description: string;
  ipAddress: string;
}