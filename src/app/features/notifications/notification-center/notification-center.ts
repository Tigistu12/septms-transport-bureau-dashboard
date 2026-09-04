import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationCenterService } from '../../../core/services/notification-center.service';
import { NotificationSeverity, TargetAudience } from '../../../core/models/notification-center.model';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification-center.html',
  styleUrl: './notification-center.scss'
})
export class NotificationCenter {
  private readonly notificationService = inject(NotificationCenterService);

  readonly notifications = this.notificationService.notifications;
  readonly searchQuery = signal<string>('');
  readonly selectedSeverityFilter = signal<string>('ALL');
  readonly isBroadcastModalOpen = signal<boolean>(false);

  newBroadcast = {
    title: '',
    message: '',
    severity: 'INFO' as NotificationSeverity,
    targetAudience: 'ALL_DRIVERS' as TargetAudience,
    issuedBy: 'Bureau Admin Dispatch'
  };

  readonly filteredNotifications = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const severity = this.selectedSeverityFilter();

    return this.notifications().filter(n => {
      const matchesSearch =
        !query ||
        n.title.toLowerCase().includes(query) ||
        n.message.toLowerCase().includes(query) ||
        n.id.toLowerCase().includes(query);

      const matchesSeverity = severity === 'ALL' || n.severity === severity;

      return matchesSearch && matchesSeverity;
    });
  });

  readonly unreadCount = computed(() =>
    this.notifications().filter(n => !n.isRead).length
  );

  openBroadcastModal(): void {
    this.isBroadcastModalOpen.set(true);
  }

  closeBroadcastModal(): void {
    this.isBroadcastModalOpen.set(false);
  }

  submitBroadcast(): void {
    this.notificationService.dispatchBroadcast(this.newBroadcast);
    this.closeBroadcastModal();
  }

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id);
  }

  clearAllNotifications(): void {
    this.notificationService.clearAll();
  }
}
