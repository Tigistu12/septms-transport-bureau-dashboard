import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DriverPenaltyService } from '../../../core/services/driver-penalty.service';
import { DriverPenalty, PenaltyReason, FineStatus } from '../../../core/models/driver-penalty.model';
import { VehicleCategory } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-driver-penalty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './driver-penalty.html',
  styleUrl: './driver-penalty.scss'
})
export class DriverPenaltyComponent {
  private readonly penaltyService = inject(DriverPenaltyService);

  readonly penalties = this.penaltyService.penalties;
  readonly searchQuery = signal<string>('');
  readonly selectedStatusFilter = signal<string>('All Statuses');
  readonly isPenaltyModalOpen = signal<boolean>(false);

  readonly statusOptions: string[] = ['All Statuses', 'UNPAID', 'PAID', 'DISPUTED', 'SUSPENDED_LICENSE'];

  newPenalty = {
    driverName: '',
    driverLicenseNumber: '',
    vehiclePlate: '',
    category: 'Minibus Taxi' as VehicleCategory,
    reason: 'TARIFF_OVERCHARGE' as PenaltyReason,
    fineAmountEtb: 2500,
    pointsDeducted: 3,
    issuedByInspector: 'Bureau Officer'
  };

  readonly filteredPenalties = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatusFilter();

    return this.penalties().filter(p => {
      const matchesSearch =
        !query ||
        p.penaltyId.toLowerCase().includes(query) ||
        p.driverName.toLowerCase().includes(query) ||
        p.driverLicenseNumber.toLowerCase().includes(query) ||
        p.vehiclePlate.toLowerCase().includes(query);

      const matchesStatus = status === 'All Statuses' || p.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  readonly totalUnpaidFineAmount = computed(() =>
    this.penalties()
      .filter(p => p.status === 'UNPAID')
      .reduce((sum, p) => sum + p.fineAmountEtb, 0)
  );

  readonly unpaidCount = computed(() =>
    this.penalties().filter(p => p.status === 'UNPAID').length
  );

  openPenaltyModal(): void {
    this.isPenaltyModalOpen.set(true);
  }

  closePenaltyModal(): void {
    this.isPenaltyModalOpen.set(false);
  }

  submitPenalty(): void {
    this.penaltyService.issuePenalty(this.newPenalty);
    this.closePenaltyModal();
  }

  markAsPaid(penaltyId: string): void {
    this.penaltyService.settlePenalty(penaltyId);
  }

  triggerSuspension(penaltyId: string): void {
    this.penaltyService.suspendLicense(penaltyId);
  }
}
