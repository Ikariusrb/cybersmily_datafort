import { KeyValue } from '@angular/common';
import { GangChartEntry } from './gang-chart-entry';
export class GangChart {
  type: Array<GangChartEntry> = new Array<GangChartEntry>();
  age: Array<GangChartEntry> = new Array<GangChartEntry>();
  memberAge: Array<GangChartEntry> = new Array<GangChartEntry>();
  member: Array<GangChartEntry> = new Array<GangChartEntry>();
  turf: Array<GangChartEntry> = new Array<GangChartEntry>();
  expansion: Array<GangChartEntry> = new Array<GangChartEntry>();
  baseCrimes: any = {};
  crimes: Array<string> = [];
  threatCodes: {
    skill: Array<KeyValue<string,string>>;
    weapon: Array<KeyValue<string, string>>;
    armor: Array<KeyValue<string, string>>;
  } = {
      skill: new Array<KeyValue<string,string>>(),
      weapon: new Array<KeyValue<string, string>>(),
      armor: new Array<KeyValue<string, string>>()
    };
  naming: {
    adjectives: Array<string>;
    objects: Array<string>;
    units: Array<string>;
  } = {
      adjectives: new Array<string>(),
      objects: new Array<string>(),
      units: new Array<string>(),
    };
}
