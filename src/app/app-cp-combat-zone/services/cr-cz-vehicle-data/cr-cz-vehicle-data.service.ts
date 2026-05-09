import { DataService } from './../../../shared/services/file-services/dataservice/data.service';
import { inject, Injectable } from '@angular/core';
import { iCrCzVehicleCard } from '../../models/cr-cz-vehicle-card';
import { map, Observable, of } from 'rxjs';
import { JsonDataFiles } from 'src/app/shared/services/file-services';

@Injectable({
  providedIn: 'root',
})
export class CrCzVehicleDataService {
  private _vehicleList: Array<iCrCzVehicleCard>;
  private dataService = inject(DataService);

  get vehicleList(): Observable<Array<iCrCzVehicleCard>> {
    if(this._vehicleList) {
      return of(this._vehicleList);
    } else {
      return this.dataService.GetJson(JsonDataFiles.COMBATZONE_VEHICLE_LIST_JSON).pipe(map((data: any) => {
        this._vehicleList = data.vehicles;
        return this._vehicleList;
      }));
    }
  }

}
