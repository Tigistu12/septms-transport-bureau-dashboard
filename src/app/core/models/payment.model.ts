import { VehicleCategory } from './vehicle.model';

export type PaymentGateway = 'Telebirr' | 'CBE Birr';
export type PaymentMethodType = 'Terminal Exit Fee (መውጫ)' | 'Passenger QR / Phone Direct';
export type PaymentStatus = 'Completed' | 'Pending' | 'Failed';

export interface TerminalExitFeeTransaction {
  id: string;
  tripId: string;
  plateNumber: string;
  driverName: string;
  category: VehicleCategory;
  terminalName: string;
  inspectorBadgeNumber: string;
  exitFeeAmountEtb: number;
  paymentGateway: PaymentGateway;
  timestamp: string;
  status: PaymentStatus;
}

export interface PassengerFareTransaction {
  id: string;
  passengerPhone: string;
  driverPhone: string;
  driverName: string;
  plateNumber: string;
  grossFareEtb: number;
  bureauTaxPercentage: number;
  bureauShareEtb: number;
  driverShareEtb: number;
  paymentGateway: PaymentGateway;
  timestamp: string;
  status: PaymentStatus;
}

export interface DirectPassengerPaymentDto {
  passengerPhone: string;
  driverPhone: string;
  grossFareEtb: number;
  paymentGateway: PaymentGateway;
}

export interface CollectTerminalExitFeeDto {
  tripId: string;
  plateNumber: string;
  driverName: string;
  category: VehicleCategory;
  terminalName: string;
  inspectorBadgeNumber: string;
  exitFeeAmountEtb: number;
  paymentGateway: PaymentGateway;
}