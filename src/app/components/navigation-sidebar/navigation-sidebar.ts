import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavigationSidebarService } from '../../core/services/navigation-sidebar.service';
import { NavigationItem } from '../../core/models/navigation-sidebar.model';

@Component({
  selector: 'app-navigation-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-sidebar.html',
  styleUrl: './navigation-sidebar.scss'
})
export class NavigationSidebar {
  readonly navService = inject(NavigationSidebarService);
  private readonly router = inject(Router);

  readonly isCollapsed = this.navService.isCollapsed;
  readonly navItems = this.navService.navigationItems;
  readonly systemStatus = this.navService.systemStatus;

  categories = [
    { key: 'core', label: 'Core Dashboards' },
    { key: 'operations', label: 'Fleet & Corridor Operations' },
    { key: 'compliance', label: 'Tariffs & Enforcement' },
    { key: 'governance', label: 'Permits & Fuel Subsidies' },
    { key: 'analytics', label: 'Analytics & Admin' }
  ];

  getItemsByCategory(categoryKey: string): NavigationItem[] {
    return this.navItems().filter(item => item.category === categoryKey);
  }

  navigate(route: string): void {
    this.navService.setActiveRoute(route);
    this.router.navigate([route]);
  }

  toggleCollapse(): void {
    this.navService.toggleSidebar();
  }
}
