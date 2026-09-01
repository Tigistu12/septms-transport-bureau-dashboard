import { VehicleCategory } from './vehicle.model';

export type AdjustmentReason = 'Fuel Price Indexing' | 'Regulatory Revision' | 'Peak Hour Surcharge' | 'Route Extension';

export interface DistanceBandTariff {
  id: string;
  category: VehicleCategory;
  minDistanceKm: number;
  maxDistanceKm: number;
  baseFareEtb: number;
  perKmRateEtb: number;
  effectiveDate: string;
}

export interface RouteStageTariff {
  id: string;
  routeCode: string;
  routeName: string;
  category: VehicleCategory;
  startStage: string;
  endStage: string;
  approvedTariffEtb: number;
  lastUpdated: string;
}

export interface CreateTariffAdjustmentDto {
  category: VehicleCategory;
  percentageChange: number;
  reason: AdjustmentReason;
  effectiveDate: string;
  notes: string;
}