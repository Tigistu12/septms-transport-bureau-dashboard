import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TariffManagementService } from '../../../core/services/tariff-management.service';
import { AdjustmentReason, CreateTariffAdjustmentDto } from '../../../core/models/tariff.model';
import { VehicleCategory } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-tariff-management',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './tariff-management.html',
  styleUrl: './tariff-management.scss'
})
export class TariffManagement {
  private readonly tariffService = inject(TariffManagementService);

  // View Mode: Distance Bands vs Route Stage Tariffs
  readonly activeTab = signal<'distance' | 'stage'>('distance');
  readonly selectedCategory = signal<string>('All Transport Categories');
  readonly searchQuery = signal<string>('');
  readonly isAdjustmentModalOpen = signal<boolean>(false);

  readonly categories: string[] = [
    'All Transport Categories',
    'Minibus Taxi',
    'Anbessa Bus',
    'Sheger Bus',
    'Velocity Bus',
    'Midi-Bus'
  ];

  readonly adjustmentReasons: AdjustmentReason[] = [
    'Fuel Price Indexing',
    'Regulatory Revision',
    'Peak Hour Surcharge',
    'Route Extension'
  ];

  // Derived Distance Bands Signal
  readonly filteredDistanceTariffs = computed(() => {
    const cat = this.selectedCategory();
    const items = this.tariffService.distanceTariffs();

    if (cat === 'All Transport Categories') return items;
    return items.filter(t => t.category === cat);
  });

  // Derived Stage Tariffs Signal
  readonly filteredStageTariffs = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const items = this.tariffService.stageTariffs();

    return items.filter(stage => {
      const matchesCat = cat === 'All Transport Categories' || stage.category === cat;
      const matchesSearch =
        !query ||
        stage.routeCode.toLowerCase().includes(query) ||
        stage.routeName.toLowerCase().includes(query) ||
        stage.startStage.toLowerCase().includes(query) ||
        stage.endStage.toLowerCase().includes(query);

      return matchesCat && matchesSearch;
    });
  });

  // Bulk Adjustment Form Model
  adjustmentForm: CreateTariffAdjustmentDto = {
    category: 'Minibus Taxi',
    percentageChange: 5.0,
    reason: 'Fuel Price Indexing',
    effectiveDate: new Date().toISOString().split('T')[0],
    notes: ''
  };

  openAdjustmentModal(): void {
    this.isAdjustmentModalOpen.set(true);
  }

  closeAdjustmentModal(): void {
    this.isAdjustmentModalOpen.set(false);
  }

  submitAdjustment(): void {
    if (!this.adjustmentForm.effectiveDate) return;

    this.tariffService.applyCategoryAdjustment(this.adjustmentForm);
    this.closeAdjustmentModal();
  }
}
