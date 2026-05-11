import { Component, inject, input, output } from '@angular/core';
import { CrCzVehicleDataService } from '../services/cr-cz-vehicle-data/cr-cz-vehicle-data.service';
import { Observable } from 'rxjs';
import { iCrCzVehicleCard } from '../models/cr-cz-vehicle-card';

@Component({
  selector: 'cs-cr-cz-vehicle-list',
  standalone: false,
  templateUrl: './cr-cz-vehicle-list.component.html',
  styleUrl: './cr-cz-vehicle-list.component.css',
})
export class CrCzVehicleListComponent {

  ownedVehicles = input<iCrCzVehicleCard[]>([]);
  vehicleDataList = inject(CrCzVehicleDataService);
  add = output<iCrCzVehicleCard>();

  get vehicleList$(): Observable<iCrCzVehicleCard[]> {
    return this.vehicleDataList.vehicleList;
  }

  vehicleCount(vehicleName: string): number {
    return this.ownedVehicles().filter(v => v.name === vehicleName).length;
  }

  addVehicle(vehicle: iCrCzVehicleCard): void {
    this.add.emit(vehicle);
  }

}
