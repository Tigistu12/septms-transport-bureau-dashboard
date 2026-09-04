import { Injectable, signal } from '@angular/core';
import { PassengerDispute } from '../models/passenger-dispute.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerDisputeService {
  readonly disputes = signal<PassengerDispute[]>([
    {
      disputeId: 'DSP-701',
      passengerName: 'Yonas Getachew',
      passengerPhone: '+251911445566',
      vehiclePlate: '3-A89102-AA',
      driverLicenseNumber: 'ETH-DRV-9012',
      category: 'Minibus Taxi',
      disputeType: 'OVERCHARGE',
      officialFareEtb: 14.50,
      chargedFareEtb: 30.00,
      excessAmountEtb: 15.50,
      incidentLocation: 'Megenagna Hub',
      incidentTimestamp: '2026-09-04 08:30',
      status: 'PENDING',
      description: 'Driver demanded 30 ETB instead of the official 14.50 ETB tariff during morning rush hour.'
    },
    {
      disputeId: 'DSP-702',
      passengerName: 'Selamawit Tekle',
      passengerPhone: '+251922889900',
      vehiclePlate: '3-B10293-AA',
      driverLicenseNumber: 'ETH-DRV-3091',
      category: 'Anbessa Bus',
      disputeType: 'UNANNOUNCED_SURGE',
      officialFareEtb: 7.00,
      chargedFareEtb: 15.00,
      excessAmountEtb: 8.00,
      incidentLocation: 'Piazza Station',
      incidentTimestamp: '2026-09-03 17:45',
      status: 'UNDER_INVESTIGATION',
      description: 'Assistant conductor collected double fare without official ministry announcement.',
      assignedInspector: 'Insp. Dawit'
    }
  ]);

  fileDispute(dispute: Omit<PassengerDispute, 'disputeId' | 'excessAmountEtb' | 'status' | 'incidentTimestamp'>): void {
    const id = `DSP-${Math.floor(700 + Math.random() * 200)}`;
    const excess = Math.max(0, dispute.chargedFareEtb - dispute.officialFareEtb);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newDispute: PassengerDispute = {
      ...dispute,
      disputeId: id,
      excessAmountEtb: excess,
      incidentTimestamp: now,
      status: 'PENDING'
    };

    this.disputes.update(list => [newDispute, ...list]);
  }

  updateDisputeStatus(disputeId: string, status: PassengerDispute['status'], inspector?: string): void {
    this.disputes.update(list =>
      list.map(d => (d.disputeId === disputeId ? { ...d, status, assignedInspector: inspector || d.assignedInspector } : d))
    );
  }
}