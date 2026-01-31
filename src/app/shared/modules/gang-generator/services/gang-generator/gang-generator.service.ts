import {
  GangChartEntry,
  CpGang,
  gangNamingTable,
  gangThreatCodeTable,
} from './../../models';
import { DiceService } from './../../../../services/dice/dice.service';
import { GangDataService } from './../gang-data/gang-data.service';
import { inject, Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GangGeneratorService {
  private _gangChartService = inject(GangDataService);
  private _dice = inject(DiceService);
  private _gangList = signal<Array<CpGang>>([]);

  gangList = this._gangList.asReadonly();

  generateGang(count: number = 1): void {
    this._gangList.set(this.createGangs(count));
  }

  clear(): void {
    this._gangList.set([]);
  }

  private createGangs(count: number): Array<CpGang> {
    const gangs = new Array<CpGang>();
    for (let i = 0; i < count; i++) {
      gangs.push(this.rollGang());
    }
    return gangs;
  }

  private rollGang(): CpGang {
    const gang = new CpGang();
    gang.name = this.generateName(this._gangChartService.gangNamingChart());
    // roll for type
    let entry = this.generateEntry(this._gangChartService.gangTypesChart());
    gang.type = entry.value;
    // roll for age, which modifies member rolls
    entry = this.generateEntry(this._gangChartService.gangAgeChart());
    const memberMod = entry?.mod.value;
    gang.age = entry.value;
    // roll for member's age
    entry = this.generateEntry(this._gangChartService.gangMemberAgeChart());
    gang.memberAge = entry.value;
    // roll for member, which modifies turf
    entry = this.generateEntry(this._gangChartService.gangMemberChart(), memberMod);
    gang.member = entry.value;
    const turfMod = entry.mod?.value;
    // roll for turf, which modifies expansion
    entry = this.generateEntry(this._gangChartService.gangTurfChart(), turfMod);
    gang.turf = entry.value;
    const expansionMod = entry.mod?.value;
    // roll for expansion
    entry = this.generateEntry(this._gangChartService.gangExpansionChart(), expansionMod);
    gang.expansion = entry.value;
    gang.threatCode = this.genaerateThreatCode(this._gangChartService.gangThreadCodesChart());
    gang.crimes = this.generateCrimes(gang.type,this._gangChartService.gangBaseChrimesChart(),this._gangChartService.gangCrimeChart());
    return gang;
  }

  private generateEntry(
    chart: Array<GangChartEntry>,
    modifier?: number
  ): GangChartEntry {
    if (modifier) {
      let dieRoll = this._dice.generateNumber(0, chart.length + modifier);
      const topRange = chart.length - 1;
      dieRoll =
        dieRoll < 0 ? 0 : dieRoll >  topRange ? topRange: dieRoll;
      return chart[dieRoll];
    }

    return this._dice.rollRandomItem<GangChartEntry>(chart);
  }

  private generateCrimes(gangType: string, baseCrimes: any, crimesChart: Array<GangChartEntry>): string {
    let crimes = [...baseCrimes[gangType]];
    const numberCrimes = this._dice.generateNumber(-2, 10);
    for(let i = 0; i < numberCrimes; i++) {
      const crime: string = this._dice.rollRandomItem<GangChartEntry>(crimesChart)?.value;
      if(!crimes.includes(crime)) {
        crimes.push(crime);
      }
    }
    return crimes.sort().join(', ');
  }

  private genaerateThreatCode(threadCodeTable: gangThreatCodeTable): string {
    let roll = this._dice.generateNumber(0,9);
    const skill = threadCodeTable.skill[roll];
    roll = this._dice.generateNumber(0,9);
    const weapon = threadCodeTable.weapon[roll];
    roll = this._dice.generateNumber(0,9);
    const armor = threadCodeTable.armor[roll];
    const threatCode = `${skill.key}${weapon.key}${armor.key} - Members have ${skill.value}, carry ${weapon.value}, and wear ${armor.value}.`;    return threatCode;
  }

  private generateName(namingChart: gangNamingTable): string {
    const unit = this._dice.rollRandomItem<string>(namingChart?.units);
    const adjective = this._dice.rollRandomItem<string>(
      namingChart?.adjectives
    );
    const object = this._dice.rollRandomItem<string>(namingChart?.objects);
    const secondObject = this._dice.rollRandomItem<string>(namingChart?.objects);
    let name = '';
    const dieRoll = this._dice.generateNumber(1, 10);
    switch (dieRoll) {
      case 1:
        name = `${object} of ${adjective} ${secondObject}`;
        break;
      case 2:
        name = `${object.endsWith('s') ? object.slice(0,-1): object}'s ${adjective} ${secondObject}`;
        break;
      case 3:
        name = `${unit} of the ${adjective} ${object}`;
        break;
      case 4:
        name = `${object} of ${adjective}`;
        break;
      case 5:
        name = `${object} of the ${secondObject}`;
        break;
      case 6:
        name = `${object.endsWith('s') ? object.slice(0,-1): object}'s ${secondObject}`;
        break;
      case 7:
        name = `${adjective} ${object} ${unit}`;
        break;
      default:
        name = `${adjective} ${object}`;
    }

    return name;
  }
}
