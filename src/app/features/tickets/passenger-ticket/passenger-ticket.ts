import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerTicketService } from '../../../core/services/passenger-ticket.service';
import { RouteTariffOption, IssuedDigitalTicket, PaymentMethod, TicketStatus } from '../../../core/models/passenger-ticket.model';

@Component({
  selector: 'app-passenger-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-ticket.html',
  styleUrl: './passenger-ticket.scss'
})
export class PassengerTicket {
  private readonly ticketService = inject(PassengerTicketService);

  readonly routeOptions = this.ticketService.routeOptions;
  readonly tickets = this.ticketService.tickets;

  readonly searchQuery = signal<string>('');
  readonly selectedStatusFilter = signal<string>('All Statuses');
  readonly isBookingModalOpen = signal<boolean>(false);
  readonly selectedTicketForQr = signal<IssuedDigitalTicket | null>(null);

  readonly statusOptions: string[] = ['All Statuses', 'ACTIVE', 'USED', 'EXPIRED', 'CANCELLED'];

  selectedRoute = signal<RouteTariffOption | null>(null);

  bookingForm = {
    passengerName: '',
    passengerPhone: '+2519',
    paymentMethod: 'Telebirr' as PaymentMethod,
    transactionRef: ''
  };

  readonly filteredTickets = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatusFilter();

    return this.tickets().filter(ticket => {
      const matchesSearch =
        !query ||
        ticket.ticketId.toLowerCase().includes(query) ||
        ticket.passengerName.toLowerCase().includes(query) ||
        ticket.passengerPhone.toLowerCase().includes(query) ||
        ticket.routeName.toLowerCase().includes(query);

      const matchesStatus = status === 'All Statuses' || ticket.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  readonly activeTicketsCount = computed(() =>
    this.tickets().filter(t => t.status === 'ACTIVE').length
  );

  openBookingModal(route: RouteTariffOption): void {
    this.selectedRoute.set(route);
    this.bookingForm.transactionRef = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    this.isBookingModalOpen.set(true);
  }

  closeBookingModal(): void {
    this.isBookingModalOpen.set(false);
    this.selectedRoute.set(null);
  }

  submitBooking(): void {
    const route = this.selectedRoute();
    if (!route) return;

    this.ticketService.issueTicket({
      passengerName: this.bookingForm.passengerName,
      passengerPhone: this.bookingForm.passengerPhone,
      routeName: route.routeName,
      category: route.category,
      fareEtb: route.officialTariffEtb,
      paymentMethod: this.bookingForm.paymentMethod,
      transactionRef: this.bookingForm.transactionRef
    });

    this.closeBookingModal();
  }

  viewQrCode(ticket: IssuedDigitalTicket): void {
    this.selectedTicketForQr.set(ticket);
  }

  closeQrModal(): void {
    this.selectedTicketForQr.set(null);
  }

  markAsUsed(ticketId: string): void {
    this.ticketService.updateTicketStatus(ticketId, 'USED');
  }

  cancelTicket(ticketId: string): void {
    this.ticketService.updateTicketStatus(ticketId, 'CANCELLED');
  }
}
