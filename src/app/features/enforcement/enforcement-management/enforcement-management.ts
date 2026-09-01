import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnforcementManagementService } from '../../../core/services/enforcement-management.service';
import { ViolationRecord, IssueViolationDto, ViolationType, EnforcementStatus } from '../../../core/models/enforcement.model';
import { VehicleCategory } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-enforcement-management',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './enforcement-management.html',
  styleUrl: './enforcement-management.scss'
})
export class EnforcementManagement {
  private readonly enforcementService = inject(EnforcementManagementService);

  readonly searchQuery = signal<string>('');
  readonly selectedTypeFilter = signal<string>('All Violations');
  readonly selectedStatusFilter = signal<string>('All Statuses');
  readonly isIssueModalOpen = signal<boolean>(false);
  readonly selectedViolationForDetail = signal<ViolationRecord | null>(null);

  readonly violationTypes: string[] = [
    'All Violations',
    'Tariff Overcharging',
    'Route Deviation',
    'Overcapacity Loading',
    'Unauthorized Terminal Departure',
    'Expired Inspection'
  ];

  readonly statuses: string[] = [
    'All Statuses',
    'Open',
    'Under Review',
    'Fine Issued',
    'Resolved',
    'Appealed'
  ];

  readonly categories: VehicleCategory[] = [
    'Minibus Taxi',
    'Anbessa Bus',
    'Sheger Bus',
    'Velocity Bus',
    'Midi-Bus'
  ];

  readonly filteredViolations = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const type = this.selectedTypeFilter();
    const status = this.selectedStatusFilter();

    return this.enforcementService.violations().filter(v => {
      const matchesSearch =
        !query ||
        v.plateNumber.toLowerCase().includes(query) ||
        v.driverName.toLowerCase().includes(query) ||
        v.driverLicenseNumber.toLowerCase().includes(query) ||
        v.id.toLowerCase().includes(query) ||
        v.locationName.toLowerCase().includes(query);

      const matchesType = type === 'All Violations' || v.violationType === type;
      const matchesStatus = status === 'All Statuses' || v.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  });

  // New Violation Ticket Form
  newTicket: IssueViolationDto = {
    plateNumber: '',
    driverLicenseNumber: '',
    driverName: '',
    category: 'Minibus Taxi',
    violationType: 'Tariff Overcharging',
    fineAmountEtb: 1500,
    demeritPoints: 3,
    locationName: '',
    officerBadgeNumber: 'OFF-101',
    notes: ''
  };

  openIssueModal(): void {
    this.isIssueModalOpen.set(true);
  }

  closeIssueModal(): void {
    this.isIssueModalOpen.set(false);
  }

  submitTicket(): void {
    if (!this.newTicket.plateNumber || !this.newTicket.driverLicenseNumber) return;

    this.enforcementService.issueViolation(this.newTicket);
    this.closeIssueModal();
    this.resetForm();
  }

  updateTicketStatus(id: string, status: EnforcementStatus): void {
    this.enforcementService.updateStatus(id, status);
  }

  openDetails(record: ViolationRecord): void {
    this.selectedViolationForDetail.set(record);
  }

  closeDetails(): void {
    this.selectedViolationForDetail.set(null);
  }

  private resetForm(): void {
    this.newTicket = {
      plateNumber: '',
      driverLicenseNumber: '',
      driverName: '',
      category: 'Minibus Taxi',
      violationType: 'Tariff Overcharging',
      fineAmountEtb: 1500,
      demeritPoints: 3,
      locationName: '',
      officerBadgeNumber: 'OFF-101',
      notes: ''
    };
  }
}