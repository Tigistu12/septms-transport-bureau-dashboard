import { Injectable, signal } from '@angular/core';
import { NavigationItem, SystemStatusSummary } from '../models/navigation-sidebar.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationSidebarService {
  readonly isCollapsed = signal<boolean>(false);
  readonly activeRoute = signal<string>('/dashboard');

  readonly navigationItems = signal<NavigationItem[]>([
    // Core & Operations
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊', route: '/dashboard', category: 'core' },
    { id: 'vehicles', label: 'Vehicle Management', icon: '🚌', route: '/vehicles', category: 'operations' },
    { id: 'drivers', label: 'Driver Enforcement & Profiles', icon: '🪪', route: '/drivers', category: 'operations' },
    { id: 'trips', label: 'Trip Monitoring', icon: '🗺️', route: '/trips', category: 'operations' },
    { id: 'fleet', label: 'Fleet Monitoring', icon: '🚐', route: '/fleet', category: 'operations' },
    { id: 'queues', label: 'Passenger Queue Management', icon: '⏳', route: '/queues', badgeCount: 4, badgeType: 'warning', category: 'operations' },
    { id: 'tracking', label: 'GPS & Telematics Tracking', icon: '📡', route: '/tracking', category: 'operations' },

    // Financials & Tariff Enforcement
    { id: 'tariffs', label: 'Tariff Management', icon: '💵', route: '/tariffs', category: 'compliance' },
    { id: 'payments', label: 'Passenger Payment & Settlement', icon: '💳', route: '/payments', category: 'compliance' },
    { id: 'tickets', label: 'Passenger Tickets', icon: '🎟️', route: '/tickets', category: 'compliance' },
    { id: 'enforcement', label: 'Enforcement Operations', icon: '⚖️', route: '/enforcement', category: 'compliance' },
    { id: 'penalties', label: 'Driver Penalties', icon: '🚨', route: '/penalties', badgeCount: 12, badgeType: 'danger', category: 'compliance' },

    // Governance & Analytics
    { id: 'disputes', label: 'Passenger Disputes & Complaints', icon: '🗣️', route: '/disputes', category: 'governance' },
    { id: 'notifications', label: 'Notification Center', icon: '🔔', route: '/notifications', category: 'governance' },
    { id: 'users', label: 'User & Staff Management', icon: '👥', route: '/users', category: 'governance' },
    { id: 'analytics', label: 'System Analytics', icon: '📈', route: '/analytics', category: 'analytics' },
    { id: 'audit', label: 'System Audit Trail', icon: '📜', route: '/audit', category: 'analytics' },
    { id: 'settings', label: 'System Settings', icon: '⚙️', route: '/settings', category: 'analytics' }
  ]);

  readonly systemStatus = signal<SystemStatusSummary>({
    activeVehicles: 1842,
    activeDrivers: 2105,
    activeDispatches: 312,
    openViolations: 12,
    systemHealth: 'NORMAL'
  });

  toggleSidebar(): void {
    this.isCollapsed.update(val => !val);
  }

  setActiveRoute(route: string): void {
    this.activeRoute.set(route);
  }
}