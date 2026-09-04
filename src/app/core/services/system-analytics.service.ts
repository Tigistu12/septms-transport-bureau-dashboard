import { Injectable, signal } from '@angular/core';
import { DailyTransportMetric, ZoneDistributionMetric } from '../models/system-analytics.model';

@Injectable({
  providedIn: 'root'
})
export class SystemAnalyticsService {
  readonly dailyMetrics = signal<DailyTransportMetric[]>([
    {
      date: '2026-09-01',
      totalTrips: 12450,
      totalPassengers: 148900,
      totalRevenueEtb: 1861250,
      tariffViolationsCount: 18,
      queueWaitTimeMinutes: 12.5
    },
    {
      date: '2026-09-02',
      totalTrips: 13100,
      totalPassengers: 156200,
      totalRevenueEtb: 1952500,
      tariffViolationsCount: 14,
      queueWaitTimeMinutes: 11.2
    },
    {
      date: '2026-09-03',
      totalTrips: 12980,
      totalPassengers: 151000,
      totalRevenueEtb: 1887500,
      tariffViolationsCount: 9,
      queueWaitTimeMinutes: 10.8
    },
    {
      date: '2026-09-04',
      totalTrips: 14200,
      totalPassengers: 168400,
      totalRevenueEtb: 2105000,
      tariffViolationsCount: 6,
      queueWaitTimeMinutes: 9.4
    }
  ]);

  readonly zoneMetrics = signal<ZoneDistributionMetric[]>([
    { zoneName: 'Bole Terminal Corridor', activeVehicles: 850, passengerVolume: 42000, complianceRatePercentage: 98.4 },
    { zoneName: 'Megenagna Hub', activeVehicles: 1200, passengerVolume: 68000, complianceRatePercentage: 96.1 },
    { zoneName: 'Tor Hailoch Transit', activeVehicles: 640, passengerVolume: 31000, complianceRatePercentage: 99.2 },
    { zoneName: 'Piazza Central Station', activeVehicles: 710, passengerVolume: 35000, complianceRatePercentage: 97.5 }
  ]);
}
