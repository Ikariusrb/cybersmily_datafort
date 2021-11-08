import { ACPAAmmo } from './acpa-ammo';
import { ACPAEnclosure } from './../enums/acpa-enclossure';
import { SourceBook } from './../../../models/sourcebook';
export interface ACPAWeapon {
  category:string;
  name: string;
  wa:number;
  damage:string;
  pen:number;
  shots: number;
  rof:number;
  range:number;
  space:number;
  weight: number;
  spaces: number;
  cost: number;
  sp: number;
  sdp: number;
  enclosed: ACPAEnclosure;
  ammo?: ACPAAmmo;
  volley?:number;
  notes?:string;
  burst?: number;
  source: SourceBook;
}
