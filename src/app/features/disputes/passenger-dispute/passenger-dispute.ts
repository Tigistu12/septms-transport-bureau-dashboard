
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerDisputeService } from '../../../core/services/passenger-dispute.service';
import { PassengerDispute, DisputeType, DisputeStatus } from '../../../core/models/passenger-dispute.model';
import { VehicleCategory } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-passenger-dispute',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-dispute.html',
  styleUrl: './passenger-dispute.scss'
})
export class PassengerDisputeComponent {
  private readonly disputeService = inject(PassengerDisputeService);

  readonly disputes = this.disputeService.disputes;
  readonly searchQuery = signal<string>('');
  readonly selectedStatusFilter = signal<string>('All Statuses');
  readonly isDisputeModalOpen = signal<boolean>(false);

  readonly statusOptions: string[] = ['All Statuses', 'PENDING', 'UNDER_INVESTIGATION', 'RESOLVED_REFUNDED', 'REJECTED'];

  newDispute = {
    passengerName: '',
    passengerPhone: '+2519',
    vehiclePlate: '',
    driverLicenseNumber: '',
    category: 'Minibus Taxi' as VehicleCategory,
    disputeType: 'OVERCHARGE' as DisputeType,
    officialFareEtb: 10,
    chargedFareEtb: 20,
    incidentLocation: '',
    description: ''
  };

  readonly filteredDisputes = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatusFilter();

    return this.disputes().filter(d => {
      const matchesSearch =
        !query ||
        d.disputeId.toLowerCase().includes(query) ||
        d.passengerName.toLowerCase().includes(query) ||
        d.passengerPhone.toLowerCase().includes(query) ||
        d.vehiclePlate.toLowerCase().includes(query);

      const matchesStatus = status === 'All Statuses' || d.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  readonly pendingDisputesCount = computed(() =>
    this.disputes().filter(d => d.status === 'PENDING').length
  );

  readonly totalOverchargeAmount = computed(() =>
    this.disputes().reduce((sum, d) => sum + d.excessAmountEtb, 0)
  );

  openDisputeModal(): void {
    this.isDisputeModalOpen.set(true);
  }

  closeDisputeModal(): void {
    this.isDisputeModalOpen.set(false);
  }

  submitDispute(): void {
    this.disputeService.fileDispute(this.newDispute);
    this.closeDisputeModal();
  }

  investigate(disputeId: string): void {
    this.disputeService.updateDisputeStatus(disputeId, 'UNDER_INVESTIGATION', 'Insp. Kebede');
  }

  resolveRefund(disputeId: string): void {
    this.disputeService.updateDisputeStatus(disputeId, 'RESOLVED_REFUNDED');
  }

  rejectDispute(disputeId: string): void {
    this.disputeService.updateDisputeStatus(disputeId, 'REJECTED');
  }
}