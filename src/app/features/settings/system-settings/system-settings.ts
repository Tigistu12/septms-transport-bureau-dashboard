import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SystemSettingsService } from '../../../core/services/system-settings.service';
import { SystemConfiguration, AuditActionType } from '../../../core/models/system-settings.model';

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './system-settings.html',
  styleUrl: './system-settings.scss'
})
export class SystemSettings {
  private readonly settingsService = inject(SystemSettingsService);

  readonly config = signal<SystemConfiguration>({ ...this.settingsService.config() });
  readonly selectedActionFilter = signal<string>('All Actions');
  readonly searchQuery = signal<string>('');
  readonly saveSuccessMessage = signal<boolean>(false);

  readonly actionTypes: string[] = [
    'All Actions',
    'TARIFF_UPDATE',
    'REINFORCEMENT_DISPATCH',
    'PENALTY_ISSUED',
    'DRIVER_SUSPENSION',
    'SYSTEM_CONFIG_CHANGE'
  ];

  readonly filteredAuditLogs = computed(() => {
    const filter = this.selectedActionFilter();
    const query = this.searchQuery().toLowerCase().trim();

    return this.settingsService.auditLogs().filter(log => {
      const matchesAction = filter === 'All Actions' || log.actionType === filter;
      const matchesSearch =
        !query ||
        log.description.toLowerCase().includes(query) ||
        log.adminUser.toLowerCase().includes(query) ||
        log.id.toLowerCase().includes(query);

      return matchesAction && matchesSearch;
    });
  });

  saveSettings(): void {
    this.settingsService.updateConfiguration(this.config());
    this.saveSuccessMessage.set(true);
    setTimeout(() => this.saveSuccessMessage.set(false), 3000);
  }
}
