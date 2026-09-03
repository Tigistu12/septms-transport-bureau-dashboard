import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FleetMonitoringService } from '../../../core/services/fleet-monitoring.service';
import { CreateReinforcementDispatchDto, ReinforcementDispatchStatus } from '../../../core/models/fleet.model';
import { VehicleCategory } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-fleet-monitoring',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fleet-monitoring.html',
  styleUrl: './fleet-monitoring.scss'
})
export class FleetMonitoring {
  private readonly fleetService = inject(FleetMonitoringService);

  readonly searchQuery = signal<string>('');
  readonly selectedCategoryFilter = signal<string>('All Categories');
  readonly selectedCongestionFilter = signal<string>('All Congestion');
  readonly isReinforcementModalOpen = signal<boolean>(false);

  readonly categories: string[] = [
    'All Categories',
    'Minibus Taxi',
    'Anbessa Bus',
    'Sheger Bus',
    'Velocity Bus',
    'Midi-Bus'
  ];

  readonly congestionLevels: string[] = ['All Congestion', 'Normal', 'Moderate', 'Heavy', 'Critical'];

  readonly terminals = this.fleetService.terminals;
  readonly reinforcementDispatches = this.fleetService.reinforcementDispatches;
  readonly availableDrivers = this.fleetService.availableDrivers;

  readonly filteredTelemetry = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategoryFilter();
    const cong = this.selectedCongestionFilter();

    return this.fleetService.routeTelemetry().filter(item => {
      const matchesSearch =
        !query ||
        item.routeCode.toLowerCase().includes(query) ||
        item.routeName.toLowerCase().includes(query);

      const matchesCat = cat === 'All Categories' || item.category === cat;
      const matchesCong = cong === 'All Congestion' || item.congestion === cong;

      return matchesSearch && matchesCat && matchesCong;
    });
  });

  // Dynamic Fleet Operational Summary Calculations
  readonly totalActiveVehiclesOnRoad = computed(() =>
    this.fleetService.routeTelemetry().reduce((sum, r) => sum + r.activeVehiclesOnRoute, 0)
  );

  readonly totalPassengersWaiting = computed(() =>
    this.fleetService.terminals().reduce((sum, t) => sum + t.waitingPassengersCount, 0)
  );

  readonly activeAcceptedReinforcements = computed(() =>
    this.fleetService.reinforcementDispatches().filter(d => d.status === 'Accepted' || d.status === 'En Route').length
  );

  // Reinforcement Form Payload
  reinforcementForm: CreateReinforcementDispatchDto = {
    terminalName: 'Piazza Taxi Interchange',
    routeCode: 'R-204',
    driverId: 'DRV-9012',
    category: 'Minibus Taxi',
    priorityNote: 'High overcrowding reported at Piazza loading bay.'
  };

  openReinforcementModal(terminalName?: string): void {
    if (terminalName) {
      this.reinforcementForm.terminalName = terminalName;
    }
    this.isReinforcementModalOpen.set(true);
  }

  closeReinforcementModal(): void {
    this.isReinforcementModalOpen.set(false);
  }

  submitReinforcementDispatch(): void {
    if (!this.reinforcementForm.driverId) return;
    this.fleetService.dispatchDriverReinforcement(this.reinforcementForm);
    this.closeReinforcementModal();
  }

  cancelDispatch(dispatchId: string): void {
    this.fleetService.updateDispatchStatus(dispatchId, 'Cancelled');
  }
}