import { Injectable, signal } from '@angular/core';
import {
  TerminalExitFeeTransaction,
  PassengerFareTransaction,
  DirectPassengerPaymentDto,
  CollectTerminalExitFeeDto
} from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerPaymentService {
  // Bureau Configurable Revenue Share Tax % (Default 7.5%)
  readonly bureauTaxPercentage = signal<number>(7.5);

  // Terminal Exit Fee Transactions (መውጫ)
  readonly exitFeeTransactions = signal<TerminalExitFeeTransaction[]>([
    {
      id: 'MEW-8801',
      tripId: 'TRIP-101',
      plateNumber: 'AA-3-12345',
      driverName: 'Abebe Kebede',
      category: 'Minibus Taxi',
      terminalName: 'Bole Terminal',
      inspectorBadgeNumber: 'INSP-302',
      exitFeeAmountEtb: 30.00,
      paymentGateway: 'Telebirr',
      timestamp: '2026-09-01 08:30 AM',
      status: 'Completed'
    },
    {
      id: 'MEW-8802',
      tripId: 'TRIP-102',
      plateNumber: 'AA-1-98765',
      driverName: 'Bekele Alemu',
      category: 'Anbessa Bus',
      terminalName: 'Megenagna Hub',
      inspectorBadgeNumber: 'INSP-109',
      exitFeeAmountEtb: 50.00,
      paymentGateway: 'CBE Birr',
      timestamp: '2026-09-01 09:15 AM',
      status: 'Completed'
    }
  ]);

  // Passenger Direct Scan/Phone Fare Transactions
  readonly passengerFareTransactions = signal<PassengerFareTransaction[]>([
    {
      id: 'TXN-9001',
      passengerPhone: '0911223344',
      driverPhone: '0987654321',
      driverName: 'Mulugeta Tadesse',
      plateNumber: 'AA-3-55123',
      grossFareEtb: 20.00,
      bureauTaxPercentage: 7.5,
      bureauShareEtb: 1.50,
      driverShareEtb: 18.50,
      paymentGateway: 'Telebirr',
      timestamp: '2026-09-01 08:42 AM',
      status: 'Completed'
    },
    {
      id: 'TXN-9002',
      passengerPhone: '0922334455',
      driverPhone: '0912345678',
      driverName: 'Getachew Hailu',
      plateNumber: 'AA-2-88120',
      grossFareEtb: 25.00,
      bureauTaxPercentage: 7.5,
      bureauShareEtb: 1.88,
      driverShareEtb: 23.12,
      paymentGateway: 'CBE Birr',
      timestamp: '2026-09-01 09:05 AM',
      status: 'Completed'
    }
  ]);

  updateBureauTaxPercentage(newPercentage: number): void {
    if (newPercentage >= 0 && newPercentage <= 100) {
      this.bureauTaxPercentage.set(newPercentage);
    }
  }

  collectTerminalExitFee(dto: CollectTerminalExitFeeDto): void {
    const newTxn: TerminalExitFeeTransaction = {
      ...dto,
      id: `MEW-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString('sv').replace('T', ' ').substring(0, 16),
      status: 'Completed'
    };

    this.exitFeeTransactions.update(current => [newTxn, ...current]);
  }

  processPassengerPayment(dto: DirectPassengerPaymentDto): void {
    const taxPercent = this.bureauTaxPercentage();
    const bureauShare = Math.round((dto.grossFareEtb * (taxPercent / 100)) * 100) / 100;
    const driverShare = Math.round((dto.grossFareEtb - bureauShare) * 100) / 100;

    const newTxn: PassengerFareTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      passengerPhone: dto.passengerPhone,
      driverPhone: dto.driverPhone,
      driverName: 'Assigned Driver',
      plateNumber: 'AA-3-99881',
      grossFareEtb: dto.grossFareEtb,
      bureauTaxPercentage: taxPercent,
      bureauShareEtb: bureauShare,
      driverShareEtb: driverShare,
      paymentGateway: dto.paymentGateway,
      timestamp: new Date().toLocaleString('sv').replace('T', ' ').substring(0, 16),
      status: 'Completed'
    };

    this.passengerFareTransactions.update(current => [newTxn, ...current]);
  }
}