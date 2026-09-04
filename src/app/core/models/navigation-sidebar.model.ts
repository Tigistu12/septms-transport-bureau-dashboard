export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  badgeCount?: number;
  badgeType?: 'danger' | 'warning' | 'success' | 'info';
  category: 'core' | 'operations' | 'compliance' | 'governance' | 'analytics';
}

export interface SystemStatusSummary {
  activeVehicles: number;
  activeDrivers: number;
  activeDispatches: number;
  openViolations: number;
  systemHealth: 'NORMAL' | 'DEGRADED' | 'CRITICAL';
}