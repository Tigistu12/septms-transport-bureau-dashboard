export type NotificationSeverity = 'INFO' | 'WARNING' | 'CRITICAL' | 'SUCCESS';
export type TargetAudience = 'ALL_DRIVERS' | 'INSPECTORS' | 'PASSENGERS' | 'ZONE_OFFICERS';

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  severity: NotificationSeverity;
  targetAudience: TargetAudience;
  timestamp: string;
  isRead: boolean;
  issuedBy: string;
}