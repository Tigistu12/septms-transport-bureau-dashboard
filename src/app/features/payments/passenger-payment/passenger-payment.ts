import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerPaymentService } from '../../../core/services/passenger-payment.service';
import {
  PaymentGateway,
  CollectTerminalExitFeeDto,
  DirectPassengerPaymentDto
} from '../../../core/models/payment.model';
import { VehicleCategory } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-passenger-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './passenger-payment.html',
  styleUrl: './passenger-payment.scss'
})
export class PassengerPayment {
  private readonly paymentService = inject(PassengerPaymentService);

  readonly activeTab = signal<'terminalExit' | 'passengerDirect'>('terminalExit');
  readonly searchQuery = signal<string>('');
  readonly selectedGatewayFilter = signal<string>('All Gateways');

  readonly bureauTaxPercent = this.paymentService.bureauTaxPercentage;

  readonly isTaxConfigModalOpen = signal<boolean>(false);
  readonly isExitFeeModalOpen = signal<boolean>(false);
  readonly isPassengerPayModalOpen = signal<boolean>(false);

  newTaxRate: number = 7.5;

  readonly gateways: string[] = ['All Gateways', 'Telebirr', 'CBE Birr'];

  readonly categories: VehicleCategory[] = [
    'Minibus Taxi',
    'Anbessa Bus',
    'Sheger Bus',
    'Velocity Bus',
    'Midi-Bus'
  ];

  // Derived Filtered Exit Fee Transactions
  readonly filteredExitFees = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const gw = this.selectedGatewayFilter();

    return this.paymentService.exitFeeTransactions().filter(t => {
      const matchesSearch =
        !query ||
        t.plateNumber.toLowerCase().includes(query) ||
        t.driverName.toLowerCase().includes(query) ||
        t.tripId.toLowerCase().includes(query) ||
        t.terminalName.toLowerCase().includes(query);

      const matchesGateway = gw === 'All Gateways' || t.paymentGateway === gw;

      return matchesSearch && matchesGateway;
    });
  });

  // Derived Filtered Passenger Fare Transactions
  readonly filteredPassengerFares = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const gw = this.selectedGatewayFilter();

    return this.paymentService.passengerFareTransactions().filter(t => {
      const matchesSearch =
        !query ||
        t.passengerPhone.toLowerCase().includes(query) ||
        t.driverPhone.toLowerCase().includes(query) ||
        t.plateNumber.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query);

      const matchesGateway = gw === 'All Gateways' || t.paymentGateway === gw;

      return matchesSearch && matchesGateway;
    });
  });

  // Summaries
  readonly totalExitFeesCollected = computed(() =>
    this.paymentService.exitFeeTransactions().reduce((acc, t) => acc + t.exitFeeAmountEtb, 0)
  );

  readonly totalPassengerBureauShare = computed(() =>
    this.paymentService.passengerFareTransactions().reduce((acc, t) => acc + t.bureauShareEtb, 0)
  );

  // Forms
  exitFeeForm: CollectTerminalExitFeeDto = {
    tripId: 'TRIP-105',
    plateNumber: '',
    driverName: '',
    category: 'Minibus Taxi',
    terminalName: 'Piazza Terminal',
    inspectorBadgeNumber: 'INSP-501',
    exitFeeAmountEtb: 30,
    paymentGateway: 'Telebirr'
  };

  passengerPayForm: DirectPassengerPaymentDto = {
    passengerPhone: '',
    driverPhone: '',
    grossFareEtb: 15.00,
    paymentGateway: 'Telebirr'
  };

  // Actions
  openTaxConfigModal(): void {
    this.newTaxRate = this.bureauTaxPercent();
    this.isTaxConfigModalOpen.set(true);
  }

  saveTaxRate(): void {
    this.paymentService.updateBureauTaxPercentage(this.newTaxRate);
    this.isTaxConfigModalOpen.set(false);
  }

  submitExitFee(): void {
    if (!this.exitFeeForm.plateNumber || !this.exitFeeForm.driverName) return;
    this.paymentService.collectTerminalExitFee(this.exitFeeForm);
    this.isExitFeeModalOpen.set(false);
  }

  submitPassengerPayment(): void {
    if (!this.passengerPayForm.passengerPhone || !this.passengerPayForm.driverPhone) return;
    this.paymentService.processPassengerPayment(this.passengerPayForm);
    this.isPassengerPayModalOpen.set(false);
  }
}