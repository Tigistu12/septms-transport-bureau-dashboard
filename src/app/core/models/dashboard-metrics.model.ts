export interface TransportSummaryMetrics {
  activeVehicles: number;
  totalPassengersToday: number;
  activeTrips: number;
  tariffViolationsCount: number;
  totalFareCollectedEtb: number;
}

export interface RecentViolationAlert {
  id: string;
  vehiclePlateNumber: string;
  driverName: string;
  routeCode: string;
  chargedFare: number;
  officialTariff: number;
  timestamp: string;
}