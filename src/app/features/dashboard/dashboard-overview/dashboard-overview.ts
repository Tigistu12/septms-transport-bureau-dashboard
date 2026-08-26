import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DashboardAnalyticsService } from '../../../core/services/dashboard-analytics.service';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.scss'
})
export class DashboardOverview {
  private readonly analyticsService = inject(DashboardAnalyticsService);

  readonly metrics = this.analyticsService.metrics;
  readonly violations = this.analyticsService.recentViolations;
}