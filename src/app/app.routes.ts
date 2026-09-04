import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard-overview/dashboard-overview')
      .then(m => m.DashboardOverview)
  },
  {
    path: 'vehicles',
    loadComponent: () => import('./features/vehicles/vehicle-management/vehicle-management')
      .then(m => m.VehicleManagement)
  },
  {
    path: 'drivers',
    loadComponent: () => import('./features/drivers/driver-enforcement/driver-enforcement')
      .then(m => m.DriverEnforcement)
  },
  {
    path: 'trips',
    loadComponent: () => import('./features/trips/trip-monitoring/trip-monitoring')
      .then(m => m.TripMonitoring)
  },
  {
    path: 'tariffs',
    loadComponent: () => import('./features/tariffs/tariff-management/tariff-management')
      .then(m => m.TariffManagement)
  },
  {
    path: 'enforcement',
    loadComponent: () => import('./features/enforcement/enforcement-management/enforcement-management')
      .then(m => m.EnforcementManagement)
  },
  {
    path: 'payments',
    loadComponent: () => import('./features/payments/passenger-payment/passenger-payment')
      .then(m => m.PassengerPayment)
  },
  {
    path: 'fleet',
    loadComponent: () => import('./features/fleet/fleet-monitoring/fleet-monitoring')
      .then(m => m.FleetMonitoring)
  },
  {
    path: 'queues',
    loadComponent: () => import('./features/queues/passenger-queue/passenger-queue')
      .then(m => m.PassengerQueue)
  },
  {
    path: 'tracking',
    loadComponent: () => import('./features/tracking/gps-tracking/gps-tracking')
      .then(m => m.GpsTracking)
  },
  {
    path: 'tickets',
    loadComponent: () => import('./features/tickets/passenger-ticket/passenger-ticket')
      .then(m => m.PassengerTicket)
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/system-settings/system-settings')
      .then(m => m.SystemSettings)
  }
];