import { Injectable, signal } from '@angular/core';
import { Trip, DispatchTripDto, TripStatus } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripMonitoringService {
  readonly trips = signal<Trip[]>([
    {
      id: 'TRIP-901',
      routeCode: 'R-101',
      origin: 'Bole Terminal',
      destination: 'Megenagna',
      category: 'Minibus Taxi',
      assignedPlateNumber: '3-A89211',
      driverName: 'Kebede Abebe',
      scheduledDepartureTime: '2026-08-31 08:00',
      actualDepartureTime: '2026-08-31 08:02',
      estimatedArrivalTime: '2026-08-31 08:35',
      status: 'In Transit',
      currentPassengerCount: 14,
      totalCapacity: 14,
      routeStages: [
        { stageName: 'Bole Brass', tariffEtb: 7.00 },
        { stageName: 'Atlas Interchange', tariffEtb: 12.00 },
        { stageName: 'Megenagna Square', tariffEtb: 15.00 }
      ]
    },
    {
      id: 'TRIP-902',
      routeCode: 'R-204',
      origin: 'Piazza',
      destination: 'Kaliti Terminal',
      category: 'Anbessa Bus',
      assignedPlateNumber: '3-B33019',
      driverName: 'Tadesse Alemu',
      scheduledDepartureTime: '2026-08-31 08:15',
      actualDepartureTime: '2026-08-31 08:15',
      estimatedArrivalTime: '2026-08-31 09:10',
      status: 'In Transit',
      currentPassengerCount: 82,
      totalCapacity: 100,
      routeStages: [
        { stageName: 'Gotera', tariffEtb: 10.00 },
        { stageName: 'Kality Ring Road', tariffEtb: 20.00 }
      ]
    },
    {
      id: 'TRIP-903',
      routeCode: 'R-305',
      origin: 'CMC St. Michael',
      destination: 'Tor Hailoch',
      category: 'Velocity Bus',
      assignedPlateNumber: '3-E99401',
      driverName: 'Mulugeta Tilahun',
      scheduledDepartureTime: '2026-08-31 09:00',
      estimatedArrivalTime: '2026-08-31 09:45',
      status: 'Scheduled',
      currentPassengerCount: 0,
      totalCapacity: 60,
      routeStages: [
        { stageName: 'Ayat Zone 2', tariffEtb: 8.00 },
        { stageName: 'Megenagna Hub', tariffEtb: 16.00 },
        { stageName: 'Tor Hailoch', tariffEtb: 25.00 }
      ]
    },
    {
      id: 'TRIP-904',
      routeCode: 'R-102',
      origin: 'Shiro Meda',
      destination: 'Mexico Square',
      category: 'Sheger Bus',
      assignedPlateNumber: '3-C55120',
      driverName: 'Getachew Belay',
      scheduledDepartureTime: '2026-08-31 07:30',
      actualDepartureTime: '2026-08-31 07:45',
      estimatedArrivalTime: '2026-08-31 08:25',
      status: 'Delayed',
      currentPassengerCount: 75,
      totalCapacity: 80,
      routeStages: [
        { stageName: 'Sidist Kilo', tariffEtb: 6.00 },
        { stageName: 'Arat Kilo', tariffEtb: 10.00 },
        { stageName: 'Mexico', tariffEtb: 18.00 }
      ]
    }
  ]);

  dispatchTrip(dto: DispatchTripDto): void {
    const newTrip: Trip = {
      id: `TRIP-${Math.floor(100 + Math.random() * 900)}`,
      routeCode: dto.routeCode,
      origin: dto.origin,
      destination: dto.destination,
      category: dto.category,
      assignedPlateNumber: dto.assignedPlateNumber,
      driverName: dto.driverName,
      scheduledDepartureTime: dto.scheduledDepartureTime,
      estimatedArrivalTime: dto.estimatedArrivalTime,
      status: 'Scheduled',
      currentPassengerCount: 0,
      totalCapacity: dto.totalCapacity,
      routeStages: [
        { stageName: `${dto.origin} - Intermediate`, tariffEtb: Math.round(dto.baseTariffEtb * 0.6) },
        { stageName: dto.destination, tariffEtb: dto.baseTariffEtb }
      ]
    };

    this.trips.update(current => [newTrip, ...current]);
  }

  updateTripStatus(tripId: string, newStatus: TripStatus): void {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    this.trips.update(current =>
      current.map(trip => {
        if (trip.id !== tripId) return trip;
        return {
          ...trip,
          status: newStatus,
          actualDepartureTime: newStatus === 'In Transit' && !trip.actualDepartureTime ? now : trip.actualDepartureTime
        };
      })
    );
  }
}
