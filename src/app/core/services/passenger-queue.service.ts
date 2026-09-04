import { Injectable, signal } from '@angular/core';
import { TerminalQueue, QueueReinforcementRequest } from '../models/passenger-queue.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerQueueService {
  readonly terminalQueues = signal<TerminalQueue[]>([
    {
      id: 'Q-101',
      terminalName: 'Megenagna Transport Hub',
      targetDestination: 'Bole Brass / Airport',
      category: 'Minibus Taxi',
      waitingPassengers: 240,
      estWaitTimeMinutes: 18,
      availableVehiclesInBay: 3,
      urgency: 'High',
      lastUpdated: 'Just now'
    },
    {
      id: 'Q-102',
      terminalName: 'Piazza Taxi Interchange',
      targetDestination: 'Kaliti Interchange',
      category: 'Anbessa Bus',
      waitingPassengers: 480,
      estWaitTimeMinutes: 32,
      availableVehiclesInBay: 1,
      urgency: 'Critical',
      lastUpdated: '1 min ago'
    },
    {
      id: 'Q-103',
      terminalName: 'Mexico Square Terminal',
      targetDestination: 'Saris / Akaki',
      category: 'Sheger Bus',
      waitingPassengers: 110,
      estWaitTimeMinutes: 8,
      availableVehiclesInBay: 8,
      urgency: 'Moderate',
      lastUpdated: '3 mins ago'
    },
    {
      id: 'Q-104',
      terminalName: 'Bole Medhanealem Hub',
      targetDestination: 'CMC St. Michael',
      category: 'Velocity Bus',
      waitingPassengers: 45,
      estWaitTimeMinutes: 4,
      availableVehiclesInBay: 12,
      urgency: 'Low',
      lastUpdated: ' Just now'
    }
  ]);

  readonly reinforcementRequests = signal<QueueReinforcementRequest[]>([
    {
      id: 'REQ-401',
      terminalName: 'Piazza Taxi Interchange',
      targetDestination: 'Kaliti Interchange',
      requestedVehiclesCount: 6,
      category: 'Anbessa Bus',
      urgency: 'Critical',
      status: 'Pending',
      requestedAt: '11:15 AM',
      notes: 'Evening peak-hour crowd surge. Waiting queue exceeds bay capacity.'
    },
    {
      id: 'REQ-402',
      terminalName: 'Megenagna Transport Hub',
      targetDestination: 'Bole Brass / Airport',
      requestedVehiclesCount: 4,
      category: 'Minibus Taxi',
      urgency: 'High',
      status: 'Approved',
      requestedAt: '10:50 AM',
      notes: '4 minibus units assigned from Tor Hailoch route.'
    }
  ]);

  createReinforcementRequest(request: Omit<QueueReinforcementRequest, 'id' | 'status' | 'requestedAt'>): void {
    const newReq: QueueReinforcementRequest = {
      ...request,
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Pending',
      requestedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.reinforcementRequests.update(reqs => [newReq, ...reqs]);
  }

  updateRequestStatus(id: string, status: QueueReinforcementRequest['status']): void {
    this.reinforcementRequests.update(reqs =>
      reqs.map(r => (r.id === id ? { ...r, status } : r))
    );
  }
}
