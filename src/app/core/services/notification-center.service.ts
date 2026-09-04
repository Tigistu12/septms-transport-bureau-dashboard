import { Injectable, signal } from '@angular/core';
import { SystemNotification } from '../models/notification-center.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationCenterService {
  readonly notifications = signal<SystemNotification[]>([
    {
      id: 'NOTIF-801',
      title: 'High Queue Congestion Warning',
      message: 'Megenagna Taxi Hub passenger queue exceeded 250 commuters. Requesting auxiliary minibus dispatch.',
      severity: 'WARNING',
      targetAudience: 'ZONE_OFFICERS',
      timestamp: '2026-09-04 18:20',
      isRead: false,
      issuedBy: 'Automated Queue Dispatch Engine'
    },
    {
      id: 'NOTIF-802',
      title: 'Severe Tariff Infringement Detected',
      message: 'Vehicle 3-A89102-AA flagged for unauthorized surge rate application (+40% above official rate).',
      severity: 'CRITICAL',
      targetAudience: 'INSPECTORS',
      timestamp: '2026-09-04 17:45',
      isRead: false,
      issuedBy: 'Tariff Enforcement Algorithm'
    },
    {
      id: 'NOTIF-803',
      title: 'Official Peak Hour Tariff Schedule Active',
      message: 'Standard evening peak tariff rates are now active across all city routes until 20:30.',
      severity: 'INFO',
      targetAudience: 'ALL_DRIVERS',
      timestamp: '2026-09-04 17:00',
      isRead: true,
      issuedBy: 'Addis Ababa City Transport Bureau'
    }
  ]);

  dispatchBroadcast(broadcastData: Omit<SystemNotification, 'id' | 'timestamp' | 'isRead'>): void {
    const randomId = `NOTIF-${Math.floor(800 + Math.random() * 100)}`;
    const now = new Date();

    const newNotification: SystemNotification = {
      ...broadcastData,
      id: randomId,
      timestamp: now.toISOString().replace('T', ' ').substring(0, 16),
      isRead: false
    };

    this.notifications.update(list => [newNotification, ...list]);
  }

  markAsRead(notificationId: string): void {
    this.notifications.update(list =>
      list.map(n => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  }

  clearAll(): void {
    this.notifications.set([]);
  }
}