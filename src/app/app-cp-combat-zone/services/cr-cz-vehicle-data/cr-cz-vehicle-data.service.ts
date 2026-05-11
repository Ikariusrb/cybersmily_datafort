import { DataService } from './../../../shared/services/file-services/dataservice/data.service';
import { inject, Injectable } from '@angular/core';
import { iCrCzVehicleCard, iCrCzVehicleData } from '../../models/cr-cz-vehicle-card';
import { map, Observable, of } from 'rxjs';
import { JsonDataFiles } from './../../../shared/services/file-services';
import { CreateCombatZoneVehicle } from '../../functions/create-combat-zone-vehicle';

@Injectable({
  providedIn: 'root',
})
export class CrCzVehicleDataService {
  private _vehicleList: Array<iCrCzVehicleCard>;
  private dataService = inject(DataService);

  get vehicleList(): Observable<Array<iCrCzVehicleCard>> {
    if(typeof this._vehicleList !== 'undefined' && this._vehicleList.length > 0) {
      return of(this._vehicleList);
    } else {
      return this.dataService.GetJson(JsonDataFiles.COMBATZONE_VEHICLE_LIST_JSON).pipe(map((data:any) => {
        this._vehicleList = data.map((vehicle:iCrCzVehicleData) => CreateCombatZoneVehicle(vehicle));
        return this._vehicleList;
      }));
    }
  }

}
