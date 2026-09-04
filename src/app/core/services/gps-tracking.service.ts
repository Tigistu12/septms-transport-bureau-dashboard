import { Injectable, signal } from '@angular/core';
import { VehicleGpsTelemetry, GeofenceZone } from '../models/gps-tracking.model';

@Injectable({
  providedIn: 'root'
})
export class GpsTrackingService {
  readonly geofenceZones = signal<GeofenceZone[]>([
    {
      id: 'GEO-01',
      zoneName: 'Central Commercial Zone (Piazza-Mexico)',
      corridorCode: 'R-204',
      radiusKm: 3.5,
      activeVehiclesInZone: 48,
      unauthorizedVehiclesCount: 1,
      status: 'Alert'
    },
    {
      id: 'GEO-02',
      zoneName: 'Eastern Airport Expressway Corridor',
      corridorCode: 'R-101',
      radiusKm: 6.0,
      activeVehiclesInZone: 62,
      unauthorizedVehiclesCount: 0,
      status: 'Normal'
    },
    {
      id: 'GEO-03',
      zoneName: 'CMC Sub-City Residential Transit Ring',
      corridorCode: 'R-305',
      radiusKm: 4.2,
      activeVehiclesInZone: 31,
      unauthorizedVehiclesCount: 2,
      status: 'Alert'
    }
  ]);

  readonly activeTelemetries = signal<VehicleGpsTelemetry[]>([
    {
      id: 'GPS-9001',
      vehiclePlate: '3-A89102-AA',
      driverName: 'Abebe Kebede',
      category: 'Minibus Taxi',
      assignedRoute: 'R-101 (Bole ➔ Megenagna)',
      latitude: 9.0102,
      longitude: 38.7612,
      speedKmh: 34,
      heading: 'NE',
      zoneStatus: 'INSIDE_ZONE',
      lastPingTime: '1 sec ago'
    },
    {
      id: 'GPS-9002',
      vehiclePlate: '3-B10293-AA',
      driverName: 'Mulugeta Tadesse',
      category: 'Anbessa Bus',
      assignedRoute: 'R-204 (Piazza ➔ Kaliti)',
      latitude: 8.9811,
      longitude: 38.7490,
      speedKmh: 18,
      heading: 'S',
      zoneStatus: 'INSIDE_ZONE',
      lastPingTime: '2 sec ago'
    },
    {
      id: 'GPS-9003',
      vehiclePlate: '3-C55120-AA',
      driverName: 'Tigist Haile',
      category: 'Sheger Bus',
      assignedRoute: 'R-410 (Mexico ➔ Saris)',
      latitude: 8.9620,
      longitude: 38.7301,
      speedKmh: 42,
      heading: 'SW',
      zoneStatus: 'CORRIDOR_DEVIATION',
      lastPingTime: 'Just now'
    },
    {
      id: 'GPS-9004',
      vehiclePlate: '3-A77123-AA',
      driverName: 'Yonas Alemu',
      category: 'Minibus Taxi',
      assignedRoute: 'R-101 (Bole ➔ Megenagna)',
      latitude: 9.0315,
      longitude: 38.7890,
      speedKmh: 0,
      heading: 'N',
      zoneStatus: 'OUT_OF_BOUNDS',
      lastPingTime: '5 sec ago'
    }
  ]);

  flagDeviation(id: string): void {
    this.activeTelemetries.update(list =>
      list.map(item =>
        item.id === id ? { ...item, zoneStatus: 'CORRIDOR_DEVIATION' } : item
      )
    );
  }
}
