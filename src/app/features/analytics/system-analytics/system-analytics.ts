import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemAnalyticsService } from '../../../core/services/system-analytics.service';

@Component({
  selector: 'app-system-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-analytics.html',
  styleUrl: './system-analytics.scss'
})
export class SystemAnalyticsComponent {
  private readonly analyticsService = inject(SystemAnalyticsService);

  readonly dailyMetrics = this.analyticsService.dailyMetrics;
  readonly zoneMetrics = this.analyticsService.zoneMetrics;

  readonly aggregateRevenue = computed(() =>
    this.dailyMetrics().reduce((sum, item) => sum + item.totalRevenueEtb, 0)
  );

  readonly aggregatePassengers = computed(() =>
    this.dailyMetrics().reduce((sum, item) => sum + item.totalPassengers, 0)
  );

  readonly averageComplianceRate = computed(() => {
    const zones = this.zoneMetrics();
    if (!zones.length) return 0;
    const sum = zones.reduce((acc, z) => acc + z.complianceRatePercentage, 0);
    return (sum / zones.length).toFixed(1);
  });

  exportReport(): void {
    alert('Exporting official Bureau Regulatory Analytics & Transport Compliance Report (PDF/CSV)...');
  }
}
