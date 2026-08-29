import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../../core/services/vehicle.service';
import { VehicleCategory, CreateVehicleDto, EngineType } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-management.html',
  styleUrl: './vehicle-management.scss'
})
export class VehicleManagement {
  private readonly vehicleService = inject(VehicleService);

  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('All Transport Categories');
  readonly isModalOpen = signal<boolean>(false);

  readonly categories: string[] = [
    'All Transport Categories',
    'Minibus Taxi',
    'Anbessa Bus',
    'Sheger Bus',
    'Velocity Bus',
    'Midi-Bus'
  ];

  availableEngines = signal<EngineType[]>(['Diesel/Fuel', 'Electric']);

  // Search filter now checks plateNumber, assignedDriverName, driverLicenseNumber, AND assignedRoute
  readonly filteredVehicles = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const categoryFilter = this.selectedCategory();
    const allVehicles = this.vehicleService.vehicles();

    return allVehicles.filter(vehicle => {
      const matchesSearch =
        !query ||
        vehicle.plateNumber.toLowerCase().includes(query) ||
        vehicle.assignedDriverName.toLowerCase().includes(query) ||
        vehicle.driverLicenseNumber.toLowerCase().includes(query) ||
        vehicle.assignedRoute.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === 'All Transport Categories' ||
        vehicle.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  });

  formData: CreateVehicleDto = {
    plateNumber: '',
    category: 'Minibus Taxi',
    engineType: 'Diesel/Fuel',
    seatingCapacity: 14,
    standingCapacity: 0,
    assignedDriverName: '',
    driverLicenseNumber: '',
    assignedRoute: '',
    status: 'In Service'
  };

  onCategoryChange(category: VehicleCategory): void {
    const defaults = this.vehicleService.getDefaultCapacities(category);
    this.formData.category = category;
    this.formData.engineType = defaults.engine;
    this.formData.seatingCapacity = defaults.seating;
    this.formData.standingCapacity = defaults.standing;
    this.availableEngines.set(defaults.availableEngines);
  }

  openModal(): void {
    this.onCategoryChange('Minibus Taxi');
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  submitVehicleRegistration(): void {
    if (!this.formData.plateNumber || !this.formData.assignedDriverName || !this.formData.driverLicenseNumber || !this.formData.assignedRoute) {
      return;
    }
    this.vehicleService.registerVehicle(this.formData);
    this.closeModal();
    this.resetForm();
  }

  private resetForm(): void {
    this.formData = {
      plateNumber: '',
      category: 'Minibus Taxi',
      engineType: 'Diesel/Fuel',
      seatingCapacity: 14,
      standingCapacity: 0,
      assignedDriverName: '',
      driverLicenseNumber: '',
      assignedRoute: '',
      status: 'In Service'
    };
  }
}