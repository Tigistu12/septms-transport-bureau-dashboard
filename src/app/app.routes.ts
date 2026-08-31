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
  }
];