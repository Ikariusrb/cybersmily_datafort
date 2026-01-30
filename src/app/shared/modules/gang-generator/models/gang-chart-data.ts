import { KeyValue } from '@angular/common';
import { ValueWeight } from './../../../models/ValueWeight';
export interface GangChartData {
  type: Array<ValueWeight<string>>;
  age: Array<ValueWeight<string>>;
  memberAge: Array<ValueWeight<string>>;
  member: Array<ValueWeight<string>>;
  turf: Array<ValueWeight<string>>;
  expansion: Array<ValueWeight<string>>;
  baseCrimes: any;
  crimes: Array<ValueWeight<string>>;
  threatcode: {
    skill:Array<KeyValue<string, string>>,
    weapon:Array<KeyValue<string, string>>,
    armor:Array<KeyValue<string, string>>},
  naming: {
    adjectives: Array<string>;
    objects: Array<string>;
    units: Array<string>;
  };
}
