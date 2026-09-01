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
  }
];