import { CrCzVehicleCard } from "../models/cr-cz-vehicle-card";
import { CreateCombatZoneGear } from "./create-combat-zone-gear";

export const CreateCombatZoneVehicle = (param:any) :CrCzVehicleCard => {
  const vehicle = new CrCzVehicleCard();
  if(!param) {
    return vehicle;
  }
  vehicle.name = param?.name || '';
  vehicle.cards = param?.cards || 0;
  if (param?.keywords && typeof param.keywords === 'string') {
    vehicle.keywords = param?.keywords ? param.keywords.split(',') : [];
  } else {
    vehicle.keywords = [...param?.keywords];
  }
  vehicle.eb = param?.eb || 0;
  vehicle.armor = param?.armor || 0;
  vehicle.hullTokens = param?.hullTokens ? param.hullTokens.map(token => {
    if(typeof token === 'string') {
      return { type: token, isRed: false,isUsed: false,isExtra: false };
    } else {
      return token;
    }
  }) : [];
  vehicle.seats = param?.seats ? [...param.seats] : [];
  vehicle.modSlots = param?.modSlots ? [...param.modSlots] : [];
  vehicle.specialRules = param?.specialRules ? [...param.specialRules] : [];
  vehicle.mods = param?.mods ? param.mods.map(gear => CreateCombatZoneGear(gear)) : [];
  vehicle.notes = param?.notes || '';
  return vehicle;
}
