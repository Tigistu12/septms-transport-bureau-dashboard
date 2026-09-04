import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditLogService } from '../../../core/services/audit-log.service';
import { AuditActionCategory, AuditSeverity } from '../../../core/models/audit-log.model';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit-log.html',
  styleUrl: './audit-log.scss'
})
export class AuditLog {
  private readonly auditService = inject(AuditLogService);

  readonly auditLogs = this.auditService.auditLogs;
  readonly searchQuery = signal<string>('');
  readonly selectedCategoryFilter = signal<string>('ALL');
  readonly selectedSeverityFilter = signal<string>('ALL');
  readonly isManualEntryModalOpen = signal<boolean>(false);

  newManualEntry = {
    performedBy: 'Bureau Admin Audit Desk',
    userRole: 'BUREAU_ADMIN',
    actionCategory: 'TARIFF_CHANGE' as AuditActionCategory,
    actionDescription: '',
    targetEntityId: '',
    severity: 'MEDIUM' as AuditSeverity
  };

  readonly filteredLogs = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategoryFilter();
    const severity = this.selectedSeverityFilter();

    return this.auditLogs().filter(log => {
      const matchesSearch =
        !query ||
        log.auditId.toLowerCase().includes(query) ||
        log.performedBy.toLowerCase().includes(query) ||
        log.actionDescription.toLowerCase().includes(query) ||
        log.targetEntityId.toLowerCase().includes(query);

      const matchesCategory = category === 'ALL' || log.actionCategory === category;
      const matchesSeverity = severity === 'ALL' || log.severity === severity;

      return matchesSearch && matchesCategory && matchesSeverity;
    });
  });

  readonly criticalAuditCount = computed(() =>
    this.auditLogs().filter(l => l.severity === 'CRITICAL' || l.severity === 'HIGH').length
  );

  openManualEntryModal(): void {
    this.isManualEntryModalOpen.set(true);
  }

  closeManualEntryModal(): void {
    this.isManualEntryModalOpen.set(false);
  }

  submitManualAudit(): void {
    this.auditService.recordManualAudit(this.newManualEntry);
    this.closeManualEntryModal();
  }
}
