import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login')
      .then(m => m.Login)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard-overview/dashboard-overview')
      .then(m => m.DashboardOverview)
  },
  {
    path: 'vehicles',
    canActivate: [authGuard],
    loadComponent: () => import('./features/vehicles/vehicle-management/vehicle-management')
      .then(m => m.VehicleManagement)
  },
  {
    path: 'drivers',
    canActivate: [authGuard],
    loadComponent: () => import('./features/drivers/driver-enforcement/driver-enforcement')
      .then(m => m.DriverEnforcement)
  },
  {
    path: 'trips',
    canActivate: [authGuard],
    loadComponent: () => import('./features/trips/trip-monitoring/trip-monitoring')
      .then(m => m.TripMonitoring)
  },
  {
    path: 'tariffs',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tariffs/tariff-management/tariff-management')
      .then(m => m.TariffManagement)
  },
  {
    path: 'enforcement',
    canActivate: [authGuard],
    loadComponent: () => import('./features/enforcement/enforcement-management/enforcement-management')
      .then(m => m.EnforcementManagement)
  },
  {
    path: 'payments',
    canActivate: [authGuard],
    loadComponent: () => import('./features/payments/passenger-payment/passenger-payment')
      .then(m => m.PassengerPayment)
  },
  {
    path: 'fleet',
    canActivate: [authGuard],
    loadComponent: () => import('./features/fleet/fleet-monitoring/fleet-monitoring')
      .then(m => m.FleetMonitoring)
  },
  {
    path: 'queues',
    canActivate: [authGuard],
    loadComponent: () => import('./features/queues/passenger-queue/passenger-queue')
      .then(m => m.PassengerQueue)
  },
  {
    path: 'tracking',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tracking/gps-tracking/gps-tracking')
      .then(m => m.GpsTracking)
  },
  {
    path: 'tickets',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tickets/passenger-ticket/passenger-ticket')
      .then(m => m.PassengerTicket)
  },
  {
    path: 'disputes',
    canActivate: [authGuard],
    loadComponent: () => import('./features/disputes/passenger-dispute/passenger-dispute')
      .then(m => m.PassengerDisputeComponent)
  },
  {
    path: 'penalties',
    canActivate: [authGuard],
    loadComponent: () => import('./features/penalties/driver-penalty/driver-penalty')
      .then(m => m.DriverPenaltyComponent)
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    loadComponent: () => import('./features/analytics/system-analytics/system-analytics')
      .then(m => m.SystemAnalyticsComponent)
  },
  {
    path: 'notifications',
    canActivate: [authGuard],
    loadComponent: () => import('./features/notifications/notification-center/notification-center')
      .then(m => m.NotificationCenter)
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./features/users/user-management/user-management')
      .then(m => m.UserManagement)
  },
  {
    path: 'audit',
    canActivate: [authGuard],
    loadComponent: () => import('./features/audit/audit-log/audit-log')
      .then(m => m.AuditLog)
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () => import('./features/settings/system-settings/system-settings')
      .then(m => m.SystemSettings)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];