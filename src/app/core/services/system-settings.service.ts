import { Injectable, signal } from '@angular/core';
import { SystemConfiguration, AuditLogEntry } from '../models/system-settings.model';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {
  readonly config = signal<SystemConfiguration>({
    telematicsRefreshIntervalSeconds: 10,
    autoDispatchReinforcementThreshold: 300,
    overchargePenaltyMultiplier: 2.5,
    maxDriverShiftHours: 12,
    enableTelebirrAutoSettlement: true,
    enableCbeBirrAutoSettlement: true,
    enforcementGracePeriodMinutes: 15
  });

  readonly auditLogs = signal<AuditLogEntry[]>([
    {
      id: 'AUD-9021',
      timestamp: '2026-09-03 10:14:22',
      adminUser: 'Admin.Tadesse',
      actionType: 'REINFORCEMENT_DISPATCH',
      description: 'Dispatched reinforcement unit DRV-9012 to Piazza Interchange',
      ipAddress: '192.168.10.45'
    },
    {
      id: 'AUD-9020',
      timestamp: '2026-09-03 09:30:10',
      adminUser: 'Admin.Bekele',
      actionType: 'TARIFF_UPDATE',
      description: 'Updated tariff rate for Minibus Taxi (0-5 km) to 12.00 ETB',
      ipAddress: '192.168.10.12'
    },
    {
      id: 'AUD-9019',
      timestamp: '2026-09-02 16:45:00',
      adminUser: 'Admin.Tadesse',
      actionType: 'DRIVER_SUSPENSION',
      description: 'Suspended Driver DRV-3091 due to repeat tariff violations',
      ipAddress: '192.168.10.45'
    },
    {
      id: 'AUD-9018',
      timestamp: '2026-09-02 14:12:05',
      adminUser: 'System.Automated',
      actionType: 'SYSTEM_CONFIG_CHANGE',
      description: 'Updated telematics sync interval to 10 seconds',
      ipAddress: '127.0.0.1'
    }
  ]);

  updateConfiguration(newConfig: SystemConfiguration): void {
    this.config.set(newConfig);

    // Append to Audit Trail
    const logEntry: AuditLogEntry = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminUser: 'Admin.ActiveUser',
      actionType: 'SYSTEM_CONFIG_CHANGE',
      description: 'Updated global system operational thresholds and policies',
      ipAddress: '192.168.10.45'
    };

    this.auditLogs.update(logs => [logEntry, ...logs]);
  }
}