import { VehicleCategory } from './vehicle.model';

export type GeofenceZoneStatus = 'INSIDE_ZONE' | 'OUT_OF_BOUNDS' | 'CORRIDOR_DEVIATION';

export interface VehicleGpsTelemetry {
  id: string;
  vehiclePlate: string;
  driverName: string;
  category: VehicleCategory;
  assignedRoute: string;
  latitude: number;
  longitude: number;
  speedKmh: number;
  heading: string;
  zoneStatus: GeofenceZoneStatus;
  lastPingTime: string;
}

export interface GeofenceZone {
  id: string;
  zoneName: string;
  corridorCode: string;
  radiusKm: number;
  activeVehiclesInZone: number;
  unauthorizedVehiclesCount: number;
  status: 'Normal' | 'Alert';
}