import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GpsTrackingService } from '../../../core/services/gps-tracking.service';
import { VehicleGpsTelemetry, GeofenceZoneStatus } from '../../../core/models/gps-tracking.model';

@Component({
  selector: 'app-gps-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gps-tracking.html',
  styleUrl: './gps-tracking.scss'
})
export class GpsTracking {
  private readonly gpsService = inject(GpsTrackingService);

  readonly searchQuery = signal<string>('');
  readonly selectedStatusFilter = signal<string>('All Statuses');

  readonly statusOptions: string[] = [
    'All Statuses',
    'INSIDE_ZONE',
    'OUT_OF_BOUNDS',
    'CORRIDOR_DEVIATION'
  ];

  readonly geofences = this.gpsService.geofenceZones;
  readonly telemetries = this.gpsService.activeTelemetries;

  readonly filteredTelemetries = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatusFilter();

    return this.telemetries().filter(item => {
      const matchesSearch =
        !query ||
        item.vehiclePlate.toLowerCase().includes(query) ||
        item.driverName.toLowerCase().includes(query) ||
        item.assignedRoute.toLowerCase().includes(query);

      const matchesStatus = status === 'All Statuses' || item.zoneStatus === status;

      return matchesSearch && matchesStatus;
    });
  });

  readonly totalTrackedVehicles = computed(() => this.telemetries().length);

  readonly activeDeviationsCount = computed(() =>
    this.telemetries().filter(t => t.zoneStatus !== 'INSIDE_ZONE').length
  );

  triggerDeviationNotice(id: string): void {
    this.gpsService.flagDeviation(id);
  }
}
