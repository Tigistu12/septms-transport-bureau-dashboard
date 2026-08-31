import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripMonitoringService } from '../../../core/services/trip-monitoring.service';
import { Trip, TripStatus, DispatchTripDto } from '../../../core/models/trip.model';
import { VehicleCategory } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-trip-monitoring',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './trip-monitoring.html',
  styleUrl: './trip-monitoring.scss'
})
export class TripMonitoring {
  private readonly tripService = inject(TripMonitoringService);

  // Search & Filter Signal State
  readonly searchQuery = signal<string>('');
  readonly selectedStatusFilter = signal<string>('All Statuses');
  readonly selectedCategoryFilter = signal<string>('All Categories');
  readonly isDispatchModalOpen = signal<boolean>(false);
  readonly selectedTripForDetails = signal<Trip | null>(null);

  readonly statusOptions: string[] = ['All Statuses', 'Scheduled', 'In Transit', 'Completed', 'Delayed', 'Cancelled'];
  readonly categoryOptions: string[] = ['All Categories', 'Minibus Taxi', 'Anbessa Bus', 'Sheger Bus', 'Velocity Bus', 'Midi-Bus'];

  // Reactive Computed Signal for Trip Filtering
  readonly filteredTrips = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const statusFilter = this.selectedStatusFilter();
    const catFilter = this.selectedCategoryFilter();

    return this.tripService.trips().filter(trip => {
      const matchesSearch =
        !query ||
        trip.routeCode.toLowerCase().includes(query) ||
        trip.origin.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query) ||
        trip.assignedPlateNumber.toLowerCase().includes(query) ||
        trip.driverName.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'All Statuses' || trip.status === statusFilter;
      const matchesCategory = catFilter === 'All Categories' || trip.category === catFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  });

  // New Trip Dispatch Form State
  dispatchForm: DispatchTripDto = {
    routeCode: 'R-105',
    origin: 'Megenagna Terminal',
    destination: 'Bole Airport',
    category: 'Minibus Taxi',
    assignedPlateNumber: '3-A89211',
    driverName: 'Kebede Abebe',
    scheduledDepartureTime: new Date().toISOString().replace('T', ' ').slice(0, 16),
    estimatedArrivalTime: new Date(Date.now() + 35 * 60000).toISOString().replace('T', ' ').slice(0, 16),
    totalCapacity: 14,
    baseTariffEtb: 15.00
  };

  openDispatchModal(): void {
    this.isDispatchModalOpen.set(true);
  }

  closeDispatchModal(): void {
    this.isDispatchModalOpen.set(false);
  }

  submitDispatch(): void {
    if (!this.dispatchForm.routeCode || !this.dispatchForm.assignedPlateNumber) return;

    this.tripService.dispatchTrip(this.dispatchForm);
    this.closeDispatchModal();
  }

  changeStatus(tripId: string, status: TripStatus): void {
    this.tripService.updateTripStatus(tripId, status);
  }

  viewTripDetails(trip: Trip): void {
    this.selectedTripForDetails.set(trip);
  }

  closeDetailsDrawer(): void {
    this.selectedTripForDetails.set(null);
  }
}