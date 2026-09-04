import { VehicleCategory } from './vehicle.model';

export type PaymentMethod = 'Telebirr' | 'CBE Birr';
export type TicketStatus = 'ACTIVE' | 'USED' | 'EXPIRED' | 'CANCELLED';

export interface RouteTariffOption {
  id: string;
  routeName: string;
  startTerminal: string;
  endTerminal: string;
  category: VehicleCategory;
  distanceKm: number;
  officialTariffEtb: number;
}

export interface IssuedDigitalTicket {
  ticketId: string;
  passengerName: string;
  passengerPhone: string;
  routeName: string;
  category: VehicleCategory;
  fareEtb: number;
  paymentMethod: PaymentMethod;
  transactionRef: string;
  qrCodeData: string;
  issuedAt: string;
  validUntil: string;
  status: TicketStatus;
}