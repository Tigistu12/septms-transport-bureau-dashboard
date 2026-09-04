export interface DailyTransportMetric {
  date: string;
  totalTrips: number;
  totalPassengers: number;
  totalRevenueEtb: number;
  tariffViolationsCount: number;
  queueWaitTimeMinutes: number;
}

export interface ZoneDistributionMetric {
  zoneName: string;
  activeVehicles: number;
  passengerVolume: number;
  complianceRatePercentage: number;
}