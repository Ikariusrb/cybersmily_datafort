import { mainRoutes } from './../../datafort-routes';
import { KeyValue } from "@angular/common";
import { iCrCzActionToken } from "./cr-cz-action-token";
import { iCrCzGearItemCard } from "./cr-cz-gear-item-card";

export interface iCrCzVehicleData {
  name: string;
  cards: number;
  keywords: string;
  eb: number;
  armor: number;
  hullTokens: Array<string>;
  seats: Array<KeyValue<string,Array<string>>>;
  modSlots: Array<string>;
  specialRules?: Array<KeyValue<string, string>>;
}

export interface iCrCzVehicleCard {
  name: string;
  cards: number;
  keywords: Array<string>;
  eb: number;
  armor: number;
  hullTokens: Array<iCrCzActionToken>;
  seats: Array<KeyValue<string,Array<string>>>;
  modSlots: Array<string>;
  mods: Array<iCrCzGearItemCard>;
  specialRules?: Array<KeyValue<string, string>>;
  totalCost: number;
}

export class CrCzVehicleCard {
  name: string = '';
  cards: number = 0;
  keywords: Array<string> = [];
  eb: number = 0;
  armor: number = 0;
  hullTokens: Array<iCrCzActionToken> = [];
  seats: Array<KeyValue<string,Array<string>>> = [];
  modSlots: Array<string> = []  ;
  specialRules?: Array<KeyValue<string, string>>;
  mods : Array<iCrCzGearItemCard> = [];
  get totalCost(): number {
    let cost = this.eb;
    return cost;
  }
}

