import { Injectable, signal } from '@angular/core';
import { ViolationRecord, IssueViolationDto, EnforcementStatus } from '../models/enforcement.model';

@Injectable({
  providedIn: 'root'
})
export class EnforcementManagementService {
  readonly violations = signal<ViolationRecord[]>([
    {
      id: 'VIO-901',
      plateNumber: 'AA-3-12345',
      driverLicenseNumber: 'ETH-DL-88219',
      driverName: 'Abebe Kebede',
      category: 'Minibus Taxi',
      violationType: 'Tariff Overcharging',
      fineAmountEtb: 1500.00,
      demeritPoints: 3,
      locationName: 'Bole Brass Roundabout',
      reportedAt: '2026-08-30 08:45 AM',
      status: 'Fine Issued',
      officerBadgeNumber: 'OFF-402',
      notes: 'Charged 20 ETB instead of approved 12 ETB tariff stage rate.'
    },
    {
      id: 'VIO-902',
      plateNumber: 'AA-1-98765',
      driverLicenseNumber: 'ETH-DL-30192',
      driverName: 'Bekele Alemu',
      category: 'Anbessa Bus',
      violationType: 'Route Deviation',
      fineAmountEtb: 2000.00,
      demeritPoints: 4,
      locationName: 'Mexico Square Interchange',
      reportedAt: '2026-08-31 02:15 PM',
      status: 'Under Review',
      officerBadgeNumber: 'OFF-109',
      notes: 'Bypassed Gotteta checkpoint without dispatch authorization.'
    },
    {
      id: 'VIO-903',
      plateNumber: 'AA-2-54321',
      driverLicenseNumber: 'ETH-DL-44102',
      driverName: 'Dawit Tadesse',
      category: 'Velocity Bus',
      violationType: 'Overcapacity Loading',
      fineAmountEtb: 3000.00,
      demeritPoints: 5,
      locationName: 'Megenagna Terminal',
      reportedAt: '2026-09-01 07:10 AM',
      status: 'Fine Issued',
      officerBadgeNumber: 'OFF-215',
      notes: 'Carrying 72 passengers on a 50-passenger capacity vehicle.'
    }
  ]);

  issueViolation(dto: IssueViolationDto): void {
    const newRecord: ViolationRecord = {
      ...dto,
      id: `VIO-${Math.floor(100 + Math.random() * 900)}`,
      reportedAt: new Date().toLocaleString('sv').replace('T', ' ').substring(0, 16),
      status: 'Fine Issued'
    };

    this.violations.update(current => [newRecord, ...current]);
  }

  updateStatus(id: string, status: EnforcementStatus): void {
    this.violations.update(current =>
      current.map(item => item.id === id ? { ...item, status } : item)
    );
  }
}
