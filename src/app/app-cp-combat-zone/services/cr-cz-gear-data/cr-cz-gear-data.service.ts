import { Injectable } from '@angular/core';
import { DataService, JsonDataFiles } from '../../../shared/services/file-services';
import { iCrCzGearItemCard } from '../../models/cr-cz-gear-item-card';
import { map, Observable, of, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrCzGearDataService {
  private _gearList: Array<iCrCzGearItemCard>;
  private _modList: Array<iCrCzGearItemCard>;

  constructor(private dataService: DataService) { }

  get gearList(): Observable<Array<iCrCzGearItemCard>> {
    if( typeof this._gearList !== 'undefined' && this._gearList.length > 0) {
      return of(this._gearList);
    } else {
      return this.dataService
        .GetJson(JsonDataFiles.COMBATZONE_GEAR_LIST_JSON)
        .pipe( map( (data: any) => {
          this._gearList =  data.gear;
          return this._gearList;
        }));
    }
  }

  get gearNameList(): Observable<Array<string>> {
    return this.gearList.pipe( map(gearList => gearList.map(gear => gear.name)));
  }
}
