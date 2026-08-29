import { Injectable, signal } from '@angular/core';
import { Vehicle, CreateVehicleDto, VehicleCategory, EngineType } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  readonly vehicles = signal<Vehicle[]>([
    {
      id: 'v-101',
      plateNumber: '3-A89211',
      category: 'Minibus Taxi',
      engineType: 'Diesel/Fuel',
      seatingCapacity: 14,
      standingCapacity: 0,
      assignedDriverName: 'Kebede Abebe',
      driverLicenseNumber: 'ETH-DL-4401',
      compliance: 'Compliant',
      lastInspection: '2026-07-15',
      assignedRoute: 'Megenagna - Mexico',
      status: 'In Service'
    },
    {
      id: 'v-106',
      plateNumber: '3-A99042',
      category: 'Minibus Taxi',
      engineType: 'Electric',
      seatingCapacity: 14,
      standingCapacity: 0,
      assignedDriverName: 'Abebe Bikila',
      driverLicenseNumber: 'ETH-DL-5510',
      compliance: 'Compliant',
      lastInspection: '2026-08-01',
      assignedRoute: 'Bole - Saris',
      status: 'In Service'
    },
    {
      id: 'v-102',
      plateNumber: '3-B33019',
      category: 'Anbessa Bus',
      engineType: 'Diesel/Fuel',
      seatingCapacity: 30,
      standingCapacity: 70,
      assignedDriverName: 'Tadesse Alemu',
      driverLicenseNumber: 'ETH-DL-1092',
      compliance: 'Compliant',
      lastInspection: '2026-06-01',
      assignedRoute: 'Piazza - Tor Hailoch',
      status: 'In Service'
    },
    {
      id: 'v-103',
      plateNumber: '3-C55120',
      category: 'Sheger Bus',
      engineType: 'Diesel/Fuel',
      seatingCapacity: 35,
      standingCapacity: 45,
      assignedDriverName: 'Getachew Belay',
      driverLicenseNumber: 'ETH-DL-8821',
      compliance: 'Compliant',
      lastInspection: '2026-08-10',
      assignedRoute: 'CMC - Stadium',
      status: 'In Service'
    },
    {
      id: 'v-104',
      plateNumber: '3-E99401',
      category: 'Velocity Bus',
      engineType: 'Electric (Velocity)',
      seatingCapacity: 40,
      standingCapacity: 20,
      assignedDriverName: 'Mulugeta Tilahun',
      driverLicenseNumber: 'ETH-DL-7732',
      compliance: 'Compliant',
      lastInspection: '2026-08-20',
      assignedRoute: 'Ayat - Mexico Expressway',
      status: 'In Service'
    },
    {
      id: 'v-105',
      plateNumber: '3-H77102',
      category: 'Midi-Bus',
      engineType: 'Diesel/Fuel',
      seatingCapacity: 24,
      standingCapacity: 8,
      assignedDriverName: 'Chala Gemechu',
      driverLicenseNumber: 'ETH-DL-3310',
      compliance: 'Suspended',
      lastInspection: '2026-05-12',
      assignedRoute: 'Kality - Merkato',
      status: 'Maintenance'
    }
  ]);

  getDefaultCapacities(category: VehicleCategory): { seating: number; standing: number; engine: EngineType; availableEngines: EngineType[] } {
    switch (category) {
      case 'Minibus Taxi':
        return { 
          seating: 14, 
          standing: 0, 
          engine: 'Diesel/Fuel', 
          availableEngines: ['Diesel/Fuel', 'Electric'] 
        };
      case 'Anbessa Bus':
        return { 
          seating: 30, 
          standing: 70, 
          engine: 'Diesel/Fuel', 
          availableEngines: ['Diesel/Fuel'] 
        };
      case 'Sheger Bus':
        return { 
          seating: 35, 
          standing: 45, 
          engine: 'Diesel/Fuel', 
          availableEngines: ['Diesel/Fuel'] 
        };
      case 'Velocity Bus':
        return { 
          seating: 40, 
          standing: 20, 
          engine: 'Electric (Velocity)', 
          availableEngines: ['Electric (Velocity)'] 
        };
      case 'Midi-Bus':
        return { 
          seating: 24, 
          standing: 8, 
          engine: 'Diesel/Fuel', 
          availableEngines: ['Diesel/Fuel'] 
        };
    }
  }

  registerVehicle(dto: CreateVehicleDto): void {
    const newVehicle: Vehicle = {
      id: `v-${Date.now().toString().slice(-3)}`,
      ...dto,
      compliance: 'Compliant',
      lastInspection: new Date().toISOString().split('T')[0]
    };
    this.vehicles.update(current => [newVehicle, ...current]);
  }
}