import { Injectable, signal } from '@angular/core';
import { Driver, IssueSanctionDto, LicenseGrade } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverEnforcementService {
  readonly drivers = signal<Driver[]>([
    {
      id: 'drv-01',
      fullName: 'Kebede Abebe Wolde',
      faydaNationalId: 'FIN-1092-3847-1102',
      licenseNumber: 'ETH-DL-4401',
      licenseGrade: 'Public Trans Grade 1',
      assignedVehiclePlate: '3-A89211',
      status: 'Active',
      accumulatedPoints: 2,
      totalFinesPaidEtb: 500,
      licenseExpiryDate: '2028-11-10',
      recentViolations: [
        {
          id: 'v-8801',
          offense: 'Route Deviation',
          penaltyPoints: 2,
          fineAmountEtb: 500,
          date: '2026-07-12',
          location: 'Megenagna Roundabout',
          officerNotes: 'Deviated from assigned route R-101 without bureau dispatch permission.'
        }
      ]
    },
    {
      id: 'drv-02',
      fullName: 'Tadesse Alemu Haile',
      faydaNationalId: 'FIN-5544-3322-1100',
      licenseNumber: 'ETH-DL-1092',
      licenseGrade: 'Public Trans Grade 3',
      assignedVehiclePlate: '3-B33019',
      status: 'Warning',
      accumulatedPoints: 8,
      totalFinesPaidEtb: 2500,
      licenseExpiryDate: '2027-04-18',
      recentViolations: [
        {
          id: 'v-8802',
          offense: 'Tariff Overcharge',
          penaltyPoints: 4,
          fineAmountEtb: 1500,
          date: '2026-08-01',
          location: 'Piazza Terminus',
          officerNotes: 'Charged 30 ETB instead of regulated 20 ETB tariff.'
        },
        {
          id: 'v-8803',
          offense: 'Overcrowding',
          penaltyPoints: 4,
          fineAmountEtb: 1000,
          date: '2026-08-15',
          location: 'Bole Brass',
          officerNotes: 'Exceeded legal passenger limit by 18 standing passengers.'
        }
      ]
    },
    {
      id: 'drv-03',
      fullName: 'Chala Gemechu Gudina',
      faydaNationalId: 'FIN-8899-0011-2233',
      licenseNumber: 'ETH-DL-3310',
      licenseGrade: 'Public Trans Grade 2',
      assignedVehiclePlate: '3-H77102',
      status: 'Suspended',
      accumulatedPoints: 14,
      totalFinesPaidEtb: 6000,
      licenseExpiryDate: '2026-12-31',
      recentViolations: [
        {
          id: 'v-8804',
          offense: 'Reckless Driving',
          penaltyPoints: 6,
          fineAmountEtb: 3000,
          date: '2026-05-10',
          location: 'Gotera Interchange',
          officerNotes: 'Endangered passenger safety during peak hour traffic.'
        }
      ]
    }
  ]);

  issueSanction(dto: IssueSanctionDto): void {
    this.drivers.update(currentDrivers =>
      currentDrivers.map(driver => {
        if (driver.id !== dto.driverId) return driver;

        const newPoints = driver.accumulatedPoints + dto.penaltyPoints;
        let updatedStatus = driver.status;

        // Ethiopian Transport Bureau License Point Rule Engine
        if (newPoints >= 12) {
          updatedStatus = 'Suspended';
        } else if (newPoints >= 6) {
          updatedStatus = 'Warning';
        }

        const newViolation = {
          id: `v-${Date.now().toString().slice(-4)}`,
          offense: dto.offense,
          penaltyPoints: dto.penaltyPoints,
          fineAmountEtb: dto.fineAmountEtb,
          date: new Date().toISOString().split('T')[0],
          location: dto.location,
          officerNotes: dto.officerNotes
        };

        return {
          ...driver,
          accumulatedPoints: newPoints,
          totalFinesPaidEtb: driver.totalFinesPaidEtb + dto.fineAmountEtb,
          status: updatedStatus,
          recentViolations: [newViolation, ...driver.recentViolations]
        };
      })
    );
  }
}