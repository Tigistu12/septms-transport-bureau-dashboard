import { Injectable, signal } from '@angular/core';
import { TransportSummaryMetrics, RecentViolationAlert } from '../models/dashboard-metrics.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardAnalyticsService {
  readonly metrics = signal<TransportSummaryMetrics>({
    activeVehicles: 1240,
    totalPassengersToday: 85400,
    activeTrips: 312,
    tariffViolationsCount: 18,
    totalFareCollectedEtb: 1281000.50
  });

  readonly recentViolations = signal<RecentViolationAlert[]>([
    {
      id: 'V-1029',
      vehiclePlateNumber: '3-A89211',
      driverName: 'Kebede Abebe',
      routeCode: 'R-101',
      chargedFare: 25.00,
      officialTariff: 15.00,
      timestamp: '10 mins ago'
    },
    {
      id: 'V-1030',
      vehiclePlateNumber: '3-B11029',
      driverName: 'Chala Gemechu',
      routeCode: 'R-105',
      chargedFare: 30.00,
      officialTariff: 20.00,
      timestamp: '25 mins ago'
    }
  ]);
}