import { Injectable, signal } from '@angular/core';
import { DistanceBandTariff, RouteStageTariff, CreateTariffAdjustmentDto } from '../models/tariff.model';

@Injectable({
  providedIn: 'root'
})
export class TariffManagementService {
  readonly distanceTariffs = signal<DistanceBandTariff[]>([
    {
      id: 'tb-01',
      category: 'Minibus Taxi',
      minDistanceKm: 0,
      maxDistanceKm: 5,
      baseFareEtb: 7.00,
      perKmRateEtb: 1.40,
      effectiveDate: '2026-07-01'
    },
    {
      id: 'tb-02',
      category: 'Minibus Taxi',
      minDistanceKm: 5.1,
      maxDistanceKm: 12,
      baseFareEtb: 15.00,
      perKmRateEtb: 1.25,
      effectiveDate: '2026-07-01'
    },
    {
      id: 'tb-03',
      category: 'Anbessa Bus',
      minDistanceKm: 0,
      maxDistanceKm: 15,
      baseFareEtb: 5.00,
      perKmRateEtb: 0.50,
      effectiveDate: '2026-06-15'
    },
    {
      id: 'tb-04',
      category: 'Sheger Bus',
      minDistanceKm: 0,
      maxDistanceKm: 15,
      baseFareEtb: 6.00,
      perKmRateEtb: 0.60,
      effectiveDate: '2026-06-15'
    },
    {
      id: 'tb-05',
      category: 'Velocity Bus',
      minDistanceKm: 0,
      maxDistanceKm: 20,
      baseFareEtb: 8.00,
      perKmRateEtb: 0.75,
      effectiveDate: '2026-08-01'
    }
  ]);

  readonly stageTariffs = signal<RouteStageTariff[]>([
    {
      id: 'st-101',
      routeCode: 'R-101',
      routeName: 'Bole Terminal ➔ Megenagna',
      category: 'Minibus Taxi',
      startStage: 'Bole Brass',
      endStage: 'Atlas Interchange',
      approvedTariffEtb: 12.00,
      lastUpdated: '2026-07-20'
    },
    {
      id: 'st-102',
      routeCode: 'R-204',
      routeName: 'Piazza ➔ Kaliti Terminal',
      category: 'Anbessa Bus',
      startStage: 'Piazza',
      endStage: 'Gotera',
      approvedTariffEtb: 10.00,
      lastUpdated: '2026-06-15'
    },
    {
      id: 'st-103',
      routeCode: 'R-305',
      routeName: 'CMC St. Michael ➔ Tor Hailoch',
      category: 'Velocity Bus',
      startStage: 'Megenagna Hub',
      endStage: 'Tor Hailoch',
      approvedTariffEtb: 25.00,
      lastUpdated: '2026-08-01'
    }
  ]);

  applyCategoryAdjustment(dto: CreateTariffAdjustmentDto): void {
    const multiplier = 1 + dto.percentageChange / 100;

    // Update Distance-based Tariffs
    this.distanceTariffs.update(current =>
      current.map(item => {
        if (item.category !== dto.category) return item;
        return {
          ...item,
          baseFareEtb: Math.round(item.baseFareEtb * multiplier * 100) / 100,
          perKmRateEtb: Math.round(item.perKmRateEtb * multiplier * 100) / 100,
          effectiveDate: dto.effectiveDate
        };
      })
    );

    // Update Route Stage Tariffs
    this.stageTariffs.update(current =>
      current.map(stage => {
        if (stage.category !== dto.category) return stage;
        return {
          ...stage,
          approvedTariffEtb: Math.round(stage.approvedTariffEtb * multiplier * 100) / 100,
          lastUpdated: dto.effectiveDate
        };
      })
    );
  }
}
