import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerQueueService } from '../../../core/services/passenger-queue.service';
import { TerminalQueue, QueueReinforcementRequest, QueueUrgencyLevel } from '../../../core/models/passenger-queue.model';
import { VehicleCategory } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-passenger-queue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-queue.html',
  styleUrl: './passenger-queue.scss'
})
export class PassengerQueue {
  private readonly queueService = inject(PassengerQueueService);

  readonly searchQuery = signal<string>('');
  readonly selectedUrgencyFilter = signal<string>('All Urgency');
  readonly isRequestModalOpen = signal<boolean>(false);

  readonly urgencyLevels: string[] = ['All Urgency', 'Low', 'Moderate', 'High', 'Critical'];

  readonly queues = this.queueService.terminalQueues;
  readonly requests = this.queueService.reinforcementRequests;

  readonly filteredQueues = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const urgency = this.selectedUrgencyFilter();

    return this.queues().filter(item => {
      const matchesQuery =
        !query ||
        item.terminalName.toLowerCase().includes(query) ||
        item.targetDestination.toLowerCase().includes(query);

      const matchesUrgency = urgency === 'All Urgency' || item.urgency === urgency;

      return matchesQuery && matchesUrgency;
    });
  });

  readonly totalWaitingPassengers = computed(() =>
    this.queues().reduce((sum, q) => sum + q.waitingPassengers, 0)
  );

  readonly criticalQueueCount = computed(() =>
    this.queues().filter(q => q.urgency === 'Critical' || q.urgency === 'High').length
  );

  newRequest: {
    terminalName: string;
    targetDestination: string;
    requestedVehiclesCount: number;
    category: VehicleCategory;
    urgency: QueueUrgencyLevel;
    notes: string;
  } = {
    terminalName: 'Piazza Taxi Interchange',
    targetDestination: 'Kaliti Interchange',
    requestedVehiclesCount: 5,
    category: 'Minibus Taxi',
    urgency: 'High',
    notes: ''
  };

  openRequestModal(terminalName?: string, targetDestination?: string): void {
    if (terminalName) this.newRequest.terminalName = terminalName;
    if (targetDestination) this.newRequest.targetDestination = targetDestination;
    this.isRequestModalOpen.set(true);
  }

  closeRequestModal(): void {
    this.isRequestModalOpen.set(false);
  }

  submitRequest(): void {
    this.queueService.createReinforcementRequest(this.newRequest);
    this.closeRequestModal();
  }

  approveRequest(id: string): void {
    this.queueService.updateRequestStatus(id, 'Approved');
  }

  rejectRequest(id: string): void {
    this.queueService.updateRequestStatus(id, 'Rejected');
  }
}
