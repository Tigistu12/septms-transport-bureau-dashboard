import { Injectable, signal } from '@angular/core';
import { RouteTariffOption, IssuedDigitalTicket } from '../models/passenger-ticket.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerTicketService {
  readonly routeOptions = signal<RouteTariffOption[]>([
    {
      id: 'RT-101',
      routeName: 'Bole Brass ➔ Megenagna Hub',
      startTerminal: 'Bole Brass Station',
      endTerminal: 'Megenagna Terminal',
      category: 'Minibus Taxi',
      distanceKm: 6.5,
      officialTariffEtb: 14.50
    },
    {
      id: 'RT-102',
      routeName: 'Piazza Interchange ➔ Kaliti Terminal',
      startTerminal: 'Piazza Station',
      endTerminal: 'Kaliti Terminal',
      category: 'Anbessa Bus',
      distanceKm: 14.2,
      officialTariffEtb: 7.00
    },
    {
      id: 'RT-103',
      routeName: 'Mexico Square ➔ Saris Market',
      startTerminal: 'Mexico Square Terminal',
      endTerminal: 'Saris Market',
      category: 'Sheger Bus',
      distanceKm: 9.8,
      officialTariffEtb: 8.50
    },
    {
      id: 'RT-104',
      routeName: 'Bole Medhanealem ➔ CMC St. Michael',
      startTerminal: 'Bole Medhanealem',
      endTerminal: 'CMC St. Michael',
      category: 'Velocity Bus',
      distanceKm: 11.0,
      officialTariffEtb: 12.00
    }
  ]);

  readonly tickets = signal<IssuedDigitalTicket[]>([
    {
      ticketId: 'TCK-80912',
      passengerName: 'Kaleb Tadesse',
      passengerPhone: '+251911223344',
      routeName: 'Bole Brass ➔ Megenagna Hub',
      category: 'Minibus Taxi',
      fareEtb: 14.50,
      paymentMethod: 'Telebirr',
      transactionRef: 'TLB-90218301',
      qrCodeData: 'SEPTMS-QR-80912-251911223344',
      issuedAt: '2026-09-04 14:20',
      validUntil: '2026-09-04 18:20',
      status: 'ACTIVE'
    },
    {
      ticketId: 'TCK-80911',
      passengerName: 'Bethlehem Alemu',
      passengerPhone: '+251922334455',
      routeName: 'Piazza Interchange ➔ Kaliti Terminal',
      category: 'Anbessa Bus',
      fareEtb: 7.00,
      paymentMethod: 'CBE Birr',
      transactionRef: 'CBE-44019283',
      qrCodeData: 'SEPTMS-QR-80911-251922334455',
      issuedAt: '2026-09-04 11:10',
      validUntil: '2026-09-04 15:10',
      status: 'USED'
    }
  ]);

  issueTicket(ticketData: Omit<IssuedDigitalTicket, 'ticketId' | 'qrCodeData' | 'issuedAt' | 'validUntil' | 'status'>): void {
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const now = new Date();
    const validTime = new Date(now.getTime() + 4 * 60 * 60 * 1000); // Valid for 4 hours

    const newTicket: IssuedDigitalTicket = {
      ...ticketData,
      ticketId: `TCK-${randomId}`,
      qrCodeData: `SEPTMS-QR-${randomId}-${ticketData.passengerPhone.replace('+', '')}`,
      issuedAt: now.toISOString().replace('T', ' ').substring(0, 16),
      validUntil: validTime.toISOString().replace('T', ' ').substring(0, 16),
      status: 'ACTIVE'
    };

    this.tickets.update(list => [newTicket, ...list]);
  }

  updateTicketStatus(ticketId: string, status: IssuedDigitalTicket['status']): void {
    this.tickets.update(list =>
      list.map(t => (t.ticketId === ticketId ? { ...t, status } : t))
    );
  }
}
