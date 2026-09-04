import { Injectable, signal } from '@angular/core';
import { AuditLogEntry } from '../models/audit-log.model';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  readonly auditLogs = signal<AuditLogEntry[]>([
    {
      auditId: 'AUD-9001',
      timestamp: '2026-09-04 19:42:10',
      performedBy: 'Amanuel Tadesse (USR-101)',
      userRole: 'BUREAU_ADMIN',
      actionCategory: 'TARIFF_CHANGE',
      actionDescription: 'Updated official peak hour base tariff multiplier for Minibus Zone 3 to 1.15x',
      targetEntityId: 'TAR-ZONE-3',
      ipAddress: '196.188.42.12',
      severity: 'HIGH'
    },
    {
      auditId: 'AUD-9002',
      timestamp: '2026-09-04 18:15:33',
      performedBy: 'Inspector Dawit Gelana (USR-102)',
      userRole: 'TRANSPORT_INSPECTOR',
      actionCategory: 'DRIVER_PENALTY',
      actionDescription: 'Issued immediate 30-day license suspension for illegal tariff surge application',
      targetEntityId: 'DRV-ETH-8821',
      ipAddress: '196.188.10.88',
      severity: 'CRITICAL'
    },
    {
      auditId: 'AUD-9003',
      timestamp: '2026-09-04 17:05:01',
      performedBy: 'Automated System (SYS-DISPATCH)',
      userRole: 'SYSTEM_ENGINE',
      actionCategory: 'SYSTEM_DISPATCH',
      actionDescription: 'Triggered high queue congestion warning and re-routed 15 auxiliary buses to Megenagna Hub',
      targetEntityId: 'HUB-MEGENAGNA',
      ipAddress: '127.0.0.1',
      severity: 'MEDIUM'
    },
    {
      auditId: 'AUD-9004',
      timestamp: '2026-09-04 15:30:19',
      performedBy: 'Kassahun Bekele (USR-104)',
      userRole: 'FINANCE_AUDITOR',
      actionCategory: 'PAYMENT_RECONCILIATION',
      actionDescription: 'Executed Telebirr digital fare collection daily batch reconciliation (142,500 ETB)',
      targetEntityId: 'BATCH-20260904-TEL',
      ipAddress: '196.188.14.205',
      severity: 'LOW'
    }
  ]);

  recordManualAudit(entryData: Omit<AuditLogEntry, 'auditId' | 'timestamp' | 'ipAddress'>): void {
    const randomId = `AUD-${Math.floor(9000 + Math.random() * 999)}`;
    const now = new Date();

    const newLog: AuditLogEntry = {
      ...entryData,
      auditId: randomId,
      timestamp: now.toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '196.188.42.100'
    };

    this.auditLogs.update(list => [newLog, ...list]);
  }
}
