import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DriverEnforcementService } from '../../../core/services/driver-enforcement.service';
import { Driver, IssueSanctionDto, OffenseCategory } from '../../../core/models/driver.model';

@Component({
  selector: 'app-driver-enforcement',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './driver-enforcement.html',
  styleUrl: './driver-enforcement.scss'
})
export class DriverEnforcement {
  private readonly driverService = inject(DriverEnforcementService);

  // Search & Filter State
  readonly searchQuery = signal<string>('');
  readonly selectedStatusFilter = signal<string>('All Statuses');
  readonly selectedDriverForDetails = signal<Driver | null>(null);
  readonly isSanctionModalOpen = signal<boolean>(false);

  readonly statusOptions: string[] = ['All Statuses', 'Active', 'Warning', 'Suspended', 'Revoked'];
  readonly offenseCategories: OffenseCategory[] = [
    'Tariff Overcharge',
    'Overcrowding',
    'Route Deviation',
    'Reckless Driving',
    'Unlicensed Operation'
  ];

  // Computed Search & Filter
  readonly filteredDrivers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const filter = this.selectedStatusFilter();

    return this.driverService.drivers().filter(driver => {
      const matchesSearch =
        !query ||
        driver.fullName.toLowerCase().includes(query) ||
        driver.licenseNumber.toLowerCase().includes(query) ||
        driver.faydaNationalId.toLowerCase().includes(query) ||
        driver.assignedVehiclePlate.toLowerCase().includes(query);

      const matchesStatus = filter === 'All Statuses' || driver.status === filter;

      return matchesSearch && matchesStatus;
    });
  });

  // Sanction Modal Form State
  sanctionForm: IssueSanctionDto = {
    driverId: '',
    offense: 'Tariff Overcharge',
    penaltyPoints: 3,
    fineAmountEtb: 1000,
    location: '',
    officerNotes: ''
  };

  openSanctionModal(driver: Driver): void {
    this.sanctionForm = {
      driverId: driver.id,
      offense: 'Tariff Overcharge',
      penaltyPoints: 3,
      fineAmountEtb: 1000,
      location: 'Addis Ababa Central Route',
      officerNotes: ''
    };
    this.isSanctionModalOpen.set(true);
  }

  closeSanctionModal(): void {
    this.isSanctionModalOpen.set(false);
  }

  submitSanction(): void {
    if (!this.sanctionForm.location || !this.sanctionForm.officerNotes) return;

    this.driverService.issueSanction(this.sanctionForm);
    this.closeSanctionModal();
    
    // Refresh selected driver details drawer if currently open
    if (this.selectedDriverForDetails()) {
      const updated = this.driverService.drivers().find(d => d.id === this.sanctionForm.driverId);
      if (updated) this.selectedDriverForDetails.set(updated);
    }
  }

  viewDriverDetails(driver: Driver): void {
    this.selectedDriverForDetails.set(driver);
  }

  closeDetailsDrawer(): void {
    this.selectedDriverForDetails.set(null);
  }
}
