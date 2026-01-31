import { ValueWeight } from './../../../models/ValueWeight';
import { gangThreatCodeTable } from './gang-threat-code-table';
import { gangNamingTable } from './gang-naming-table';

export interface GangChartData {
  type: Array<ValueWeight<string>>;
  age: Array<ValueWeight<string>>;
  memberAge: Array<ValueWeight<string>>;
  member: Array<ValueWeight<string>>;
  turf: Array<ValueWeight<string>>;
  expansion: Array<ValueWeight<string>>;
  baseCrimes: any;
  crimes: Array<ValueWeight<string>>;
  threatcode: gangThreatCodeTable;
  naming: gangNamingTable;
}
