import { Injectable, signal, computed } from '@angular/core';
import {
  TerminalMetrics,
  RouteTelemetry,
  ReinforcementDispatchStatus,
  ReinforcementDispatch,
  AvailableDriverOption,
  CreateReinforcementDispatchDto
} from '../models/fleet.model';

@Injectable({
  providedIn: 'root'
})
export class FleetMonitoringService {
  // Registered available drivers eligible for terminal dynamic reinforcement
  readonly availableDrivers = signal<AvailableDriverOption[]>([
    {
      driverId: 'DRV-9012',
      driverName: 'Abebe Kebede',
      vehiclePlate: '3-A89102-AA',
      category: 'Minibus Taxi',
      currentLocation: 'Bole Medhanealem (1.2 km away)',
      isAvailable: true
    },
    {
      driverId: 'DRV-4411',
      driverName: 'Mulugeta Tadesse',
      vehiclePlate: '3-B10293-AA',
      category: 'Anbessa Bus',
      currentLocation: 'Piazza Church (0.5 km away)',
      isAvailable: true
    },
    {
      driverId: 'DRV-3302',
      driverName: 'Tigist Haile',
      vehiclePlate: '3-C55120-AA',
      category: 'Sheger Bus',
      currentLocation: 'Mexico Square (2.1 km away)',
      isAvailable: true
    },
    {
      driverId: 'DRV-8821',
      driverName: 'Yonas Alemu',
      vehiclePlate: '3-A77123-AA',
      category: 'Minibus Taxi',
      currentLocation: 'Megenagna Flyover (0.8 km away)',
      isAvailable: true
    },
    {
      driverId: 'DRV-1190',
      driverName: 'Dawit Solomon',
      vehiclePlate: '3-V99120-AA',
      category: 'Velocity Bus',
      currentLocation: 'CMC Roundabout (1.5 km away)',
      isAvailable: true
    }
  ]);

  readonly terminals = signal<TerminalMetrics[]>([
    {
      id: 'TM-01',
      terminalName: 'Megenagna Transport Hub',
      activeVehiclesInQueue: 42,
      waitingPassengersCount: 310,
      avgWaitTimeMinutes: 12,
      status: 'High Demand'
    },
    {
      id: 'TM-02',
      terminalName: 'Bole Brass Bus Terminal',
      activeVehiclesInQueue: 28,
      waitingPassengersCount: 95,
      avgWaitTimeMinutes: 5,
      status: 'Optimal'
    },
    {
      id: 'TM-03',
      terminalName: 'Piazza Taxi Interchange',
      activeVehiclesInQueue: 18,
      waitingPassengersCount: 450,
      avgWaitTimeMinutes: 24,
      status: 'Overcrowded'
    },
    {
      id: 'TM-04',
      terminalName: 'Kaliti Interchange Terminal',
      activeVehiclesInQueue: 35,
      waitingPassengersCount: 140,
      avgWaitTimeMinutes: 8,
      status: 'Optimal'
    }
  ]);

  readonly routeTelemetry = signal<RouteTelemetry[]>([
    {
      id: 'TEL-101',
      routeCode: 'R-101',
      routeName: 'Bole Terminal ➔ Megenagna Hub',
      category: 'Minibus Taxi',
      activeVehiclesOnRoute: 64,
      avgSpeedKmh: 28,
      congestion: 'Moderate',
      lastUpdated: '10 sec ago'
    },
    {
      id: 'TEL-204',
      routeCode: 'R-204',
      routeName: 'Piazza ➔ Kaliti Terminal',
      category: 'Anbessa Bus',
      activeVehiclesOnRoute: 18,
      avgSpeedKmh: 14,
      congestion: 'Heavy',
      lastUpdated: '5 sec ago'
    },
    {
      id: 'TEL-305',
      routeCode: 'R-305',
      routeName: 'CMC St. Michael ➔ Tor Hailoch',
      category: 'Velocity Bus',
      activeVehiclesOnRoute: 22,
      avgSpeedKmh: 42,
      congestion: 'Normal',
      lastUpdated: '2 sec ago'
    },
    {
      id: 'TEL-410',
      routeCode: 'R-410',
      routeName: 'Mexico Square ➔ Saris',
      category: 'Sheger Bus',
      activeVehiclesOnRoute: 15,
      avgSpeedKmh: 9,
      congestion: 'Critical',
      lastUpdated: '1 sec ago'
    }
  ]);

  // Live Reinforcement Dispatch Records
  readonly reinforcementDispatches = signal<ReinforcementDispatch[]>([
    {
      id: 'DISP-8001',
      terminalName: 'Piazza Taxi Interchange',
      routeCode: 'R-204',
      driverId: 'DRV-9012',
      driverName: 'Abebe Kebede',
      vehiclePlate: '3-A89102-AA',
      category: 'Minibus Taxi',
      status: 'Accepted',
      dispatchedAt: '10:14 AM',
      respondedAt: '10:15 AM'
    },
    {
      id: 'DISP-8002',
      terminalName: 'Piazza Taxi Interchange',
      routeCode: 'R-204',
      driverId: 'DRV-7701',
      driverName: 'Kassahun Worku',
      vehiclePlate: '3-A11902-AA',
      category: 'Minibus Taxi',
      status: 'Declined',
      declineReason: 'Vehicle Mechanical Issue / Low Fuel',
      dispatchedAt: '10:10 AM',
      respondedAt: '10:12 AM'
    }
  ]);

  // Dispatch Reinforcement Order to a Specific Driver
  dispatchDriverReinforcement(dto: CreateReinforcementDispatchDto): void {
    const driver = this.availableDrivers().find(d => d.driverId === dto.driverId);
    if (!driver) return;

    const newDispatch: ReinforcementDispatch = {
      id: `DISP-${Math.floor(1000 + Math.random() * 9000)}`,
      terminalName: dto.terminalName,
      routeCode: dto.routeCode,
      driverId: driver.driverId,
      driverName: driver.driverName,
      vehiclePlate: driver.vehiclePlate,
      category: driver.category,
      status: 'Pending',
      dispatchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Append to live dispatch list
    this.reinforcementDispatches.update(records => [newDispatch, ...records]);

    // Mark driver as occupied
    this.availableDrivers.update(drivers =>
      drivers.map(d => (d.driverId === dto.driverId ? { ...d, isAvailable: false } : d))
    );

    // Simulate real-time signal round-trip from Driver Mobile App
    this.simulateDriverAppResponse(newDispatch.id);
  }

  // Simulates WebSocket push response from Driver Mobile App (Accept/Decline)
  private simulateDriverAppResponse(dispatchId: string): void {
    setTimeout(() => {
      const willAccept = Math.random() > 0.25; // 75% acceptance probability simulation

      this.reinforcementDispatches.update(dispatches =>
        dispatches.map(item => {
          if (item.id === dispatchId && item.status === 'Pending') {
            const updatedStatus = willAccept ? 'Accepted' : 'Declined';
            const respondedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            if (willAccept) {
              this.applyTerminalReinforcementEffects(item.terminalName);
            }

            return {
              ...item,
              status: updatedStatus,
              declineReason: willAccept ? undefined : 'Driver out of operational shift / Far from route',
              respondedAt: respondedTime
            };
          }
          return item;
        })
      );
    }, 4000); // 4-second simulated latency for driver mobile action
  }

  // Adjusts terminal metrics when a reinforcement driver accepts
  private applyTerminalReinforcementEffects(terminalName: string): void {
    this.terminals.update(current =>
      current.map(t => {
        if (t.terminalName === terminalName) {
          const updatedQueue = t.activeVehiclesInQueue + 1;
          const updatedPassengers = Math.max(0, t.waitingPassengersCount - 16);
          return {
            ...t,
            activeVehiclesInQueue: updatedQueue,
            waitingPassengersCount: updatedPassengers,
            status: updatedPassengers > 300 ? 'Overcrowded' : updatedPassengers > 150 ? 'High Demand' : 'Optimal'
          };
        }
        return t;
      })
    );
  }

  // Admin Manual Status Override
  updateDispatchStatus(dispatchId: string, status: ReinforcementDispatchStatus): void {
    this.reinforcementDispatches.update(records =>
      records.map(r => (r.id === dispatchId ? { ...r, status } : r))
    );
  }
}