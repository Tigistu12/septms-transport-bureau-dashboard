import { Injectable, signal } from '@angular/core';
import { DriverPenalty } from '../models/driver-penalty.model';

@Injectable({
  providedIn: 'root'
})
export class DriverPenaltyService {
  readonly penalties = signal<DriverPenalty[]>([
    {
      penaltyId: 'FIN-501',
      driverName: 'Abebe Kebede',
      driverLicenseNumber: 'ETH-DRV-9012',
      vehiclePlate: '3-A89102-AA',
      category: 'Minibus Taxi',
      reason: 'TARIFF_OVERCHARGE',
      fineAmountEtb: 2500,
      pointsDeducted: 3,
      issuedAt: '2026-09-02 10:15',
      dueDate: '2026-09-16',
      status: 'UNPAID',
      issuedByInspector: 'Insp. Dawit'
    },
    {
      penaltyId: 'FIN-502',
      driverName: 'Tigist Haile',
      driverLicenseNumber: 'ETH-DRV-4412',
      vehiclePlate: '3-C55120-AA',
      category: 'Sheger Bus',
      reason: 'ROUTE_DEVIATION',
      fineAmountEtb: 1500,
      pointsDeducted: 2,
      issuedAt: '2026-09-01 14:00',
      dueDate: '2026-09-15',
      status: 'PAID',
      issuedByInspector: 'Auto-GPS-Geofence'
    },
    {
      penaltyId: 'FIN-503',
      driverName: 'Yonas Alemu',
      driverLicenseNumber: 'ETH-DRV-1182',
      vehiclePlate: '3-A77123-AA',
      category: 'Minibus Taxi',
      reason: 'UNANNOUNCED_SURGE',
      fineAmountEtb: 5000,
      pointsDeducted: 5,
      issuedAt: '2026-08-28 09:30',
      dueDate: '2026-09-11',
      status: 'SUSPENDED_LICENSE',
      issuedByInspector: 'Transport Bureau Compliance Board'
    }
  ]);

  issuePenalty(penaltyData: Omit<DriverPenalty, 'penaltyId' | 'issuedAt' | 'dueDate' | 'status'>): void {
    const randomId = `FIN-${Math.floor(500 + Math.random() * 400)}`;
    const now = new Date();
    const dueDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days due limit

    const newPenalty: DriverPenalty = {
      ...penaltyData,
      penaltyId: randomId,
      issuedAt: now.toISOString().replace('T', ' ').substring(0, 16),
      dueDate: dueDate.toISOString().substring(0, 10),
      status: 'UNPAID'
    };

    this.penalties.update(list => [newPenalty, ...list]);
  }

  settlePenalty(penaltyId: string): void {
    this.penalties.update(list =>
      list.map(p => (p.penaltyId === penaltyId ? { ...p, status: 'PAID' } : p))
    );
  }

  suspendLicense(penaltyId: string): void {
    this.penalties.update(list =>
      list.map(p => (p.penaltyId === penaltyId ? { ...p, status: 'SUSPENDED_LICENSE' } : p))
    );
  }
}