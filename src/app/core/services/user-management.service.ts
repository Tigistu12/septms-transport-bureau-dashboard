import { Injectable, signal } from '@angular/core';
import { BureauUser } from '../models/user-management.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  readonly users = signal<BureauUser[]>([
    {
      userId: 'USR-101',
      fullName: 'Amanuel Tadesse',
      email: 'amanuel.t@transport.gov.et',
      phoneNumber: '+251911223344',
      role: 'BUREAU_ADMIN',
      assignedZone: 'HQ Central',
      status: 'ACTIVE',
      lastLogin: '2026-09-04 19:10'
    },
    {
      userId: 'USR-102',
      fullName: 'Inspector Dawit Gelana',
      email: 'dawit.g@transport.gov.et',
      phoneNumber: '+251922334455',
      role: 'TRANSPORT_INSPECTOR',
      assignedZone: 'Bole Terminal Corridor',
      status: 'ACTIVE',
      lastLogin: '2026-09-04 18:30'
    },
    {
      userId: 'USR-103',
      fullName: 'Bethlehem Worku',
      email: 'bethlehem.w@transport.gov.et',
      phoneNumber: '+251933445566',
      role: 'QUEUE_MARSHAL',
      assignedZone: 'Megenagna Hub',
      status: 'ACTIVE',
      lastLogin: '2026-09-04 17:15'
    },
    {
      userId: 'USR-104',
      fullName: 'Kassahun Bekele',
      email: 'kassahun.b@transport.gov.et',
      phoneNumber: '+251944556677',
      role: 'FINANCE_AUDITOR',
      assignedZone: 'HQ Revenue Division',
      status: 'SUSPENDED',
      lastLogin: '2026-08-20 11:00'
    }
  ]);

  registerUser(userData: Omit<BureauUser, 'userId' | 'lastLogin' | 'status'>): void {
    const randomId = `USR-${Math.floor(100 + Math.random() * 900)}`;

    const newUser: BureauUser = {
      ...userData,
      userId: randomId,
      status: 'ACTIVE',
      lastLogin: 'Never'
    };

    this.users.update(list => [newUser, ...list]);
  }

  toggleUserStatus(userId: string): void {
    this.users.update(list =>
      list.map(u => {
        if (u.userId === userId) {
          const nextStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  }
}
