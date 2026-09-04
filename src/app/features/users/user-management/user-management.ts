import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserManagementService } from '../../../core/services/user-management.service';
import { UserRole, UserStatus } from '../../../core/models/user-management.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss'
})
export class UserManagement {
  private readonly userService = inject(UserManagementService);

  readonly users = this.userService.users;
  readonly searchQuery = signal<string>('');
  readonly selectedRoleFilter = signal<string>('ALL');
  readonly isRegisterModalOpen = signal<boolean>(false);

  newUser = {
    fullName: '',
    email: '',
    phoneNumber: '',
    role: 'TRANSPORT_INSPECTOR' as UserRole,
    assignedZone: 'Bole Terminal Corridor'
  };

  readonly filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const role = this.selectedRoleFilter();

    return this.users().filter(u => {
      const matchesSearch =
        !query ||
        u.fullName.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.userId.toLowerCase().includes(query) ||
        u.assignedZone.toLowerCase().includes(query);

      const matchesRole = role === 'ALL' || u.role === role;

      return matchesSearch && matchesRole;
    });
  });

  readonly activeUsersCount = computed(() =>
    this.users().filter(u => u.status === 'ACTIVE').length
  );

  openRegisterModal(): void {
    this.isRegisterModalOpen.set(true);
  }

  closeRegisterModal(): void {
    this.isRegisterModalOpen.set(false);
  }

  submitRegistration(): void {
    this.userService.registerUser(this.newUser);
    this.closeRegisterModal();
  }

  toggleStatus(userId: string): void {
    this.userService.toggleUserStatus(userId);
  }
}
