import {
  GangChartEntry,
  GangChart,
  CpGang,
  GangChartData,
} from './../../models';
import { ValueWeight } from './../../../../models/ValueWeight';
import { DiceService } from './../../../../services/dice/dice.service';
import { Observable, of, map } from 'rxjs';
import { GangDataService } from './../gang-data/gang-data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GangGeneratorService {
  private _gangCharts: GangChart;

  constructor(
    private gangChartService: GangDataService,
    private dice: DiceService
  ) {}

  generateGang(count?: number): Observable<Array<CpGang>> {
    const numOfGangs = count ?? 1;
    if (this._gangCharts) {
      return of(this.createGangs(numOfGangs, this._gangCharts));
    }
    return this.gangChartService.GangDataCharts.pipe(
      map((charts) => {
        this.fillCharts(charts);
        return this.createGangs(numOfGangs, this._gangCharts);
      })
    );
  }

  private createGangs(count: number, charts: GangChart): Array<CpGang> {
    const gangs = new Array<CpGang>();
    for (let i = 0; i < count; i++) {
      gangs.push(this.rollGang(charts));
    }
    return gangs;
  }

  private fillCharts(data: GangChartData): void {
    this._gangCharts = new GangChart();
    this._gangCharts.type = this.fillChart(data.type);
    this._gangCharts.age = this.fillChart(data.age);
    this._gangCharts.memberAge = this.fillChart(data.memberAge);
    this._gangCharts.member = this.fillChart(data.member);
    this._gangCharts.turf = this.fillChart(data.turf);
    this._gangCharts.expansion = this.fillChart(data.expansion);
    this._gangCharts.baseCrimes = data?.baseCrimes;
    this._gangCharts.crimes = data?.crimes.map(crime => crime.value);
    this._gangCharts.threatCodes = {
      skill: [...data.threatcode?.skill],
      weapon: [...data.threatcode?.weapon],
      armor: [...data.threatcode?.armor]
    };
    this._gangCharts.naming = {
      adjectives: [...data.naming.adjectives],
      objects: [...data.naming.objects],
      units: [...data.naming.units],
    };
  }

  private fillChart(list: Array<ValueWeight<string>>): Array<GangChartEntry> {
    const result = new Array<GangChartEntry>();
    list.forEach((item) => {
      for (let i = 0; i < item.wt; i++) {
        const entry: GangChartEntry = {...item};
        result.push(entry);
      }
    });
    return result;
  }

  private rollGang(charts: GangChart): CpGang {
    const gang = new CpGang();
    gang.name = this.generateName(charts);
    // roll for type
    let entry = this.generateEntry(charts.type);
    gang.type = entry.value;
    // roll for age, which modifies member rolls
    entry = this.generateEntry(charts.age);
    const memberMod = entry?.mod.value;
    gang.age = entry.value;
    // roll for member's age
    entry = this.generateEntry(charts.memberAge);
    gang.memberAge = entry.value;
    // roll for member, which modifies turf
    entry = this.generateEntry(charts.member, memberMod);
    gang.member = entry.value;
    const turfMod = entry.mod?.value;
    // roll for turf, which modifies expansion
    entry = this.generateEntry(charts.turf, turfMod);
    gang.turf = entry.value;
    const expansionMod = entry.mod?.value;
    // roll for expansion
    entry = this.generateEntry(charts.expansion, expansionMod);
    gang.expansion = entry.value;
    gang.threatCode = this.genaerateThreatCode();
    gang.crimes = this.generateCrimes(gang.type);
    return gang;
  }

  private generateEntry(
    chart: Array<GangChartEntry>,
    modifier?: number
  ): GangChartEntry {
    if (modifier) {
      let dieRoll = this.dice.generateNumber(0, chart.length + modifier);
      const topRange = chart.length - 1;
      dieRoll =
        dieRoll < 0 ? 0 : dieRoll >  topRange ? topRange: dieRoll;
      return chart[dieRoll];
    }

    return this.dice.rollRandomItem<GangChartEntry>(chart);
  }

  private generateCrimes(gangType: string): string {
    let crimes = [...this._gangCharts.baseCrimes[gangType]];
    const numberCrimes = this.dice.generateNumber(-2, 10);
    for(let i = 0; i < numberCrimes; i++) {
      const crime: string = this.dice.rollRandomItem<string>(this._gangCharts.crimes);
      if(!crimes.includes(crime)) {
        crimes.push(crime);
      }
    }
    return crimes.sort().join(', ');
  }

  private genaerateThreatCode(): string {
    let roll = this.dice.generateNumber(0,9);
    const skill = this._gangCharts.threatCodes.skill[roll];
    roll = this.dice.generateNumber(0,9);
    const weapon = this._gangCharts.threatCodes.weapon[roll];
    roll = this.dice.generateNumber(0,9);
    const armor = this._gangCharts.threatCodes.armor[roll];
    const threatCode = `${skill.key}${weapon.key}${armor.key} - Members have ${skill.value}, carry ${weapon.value}, and wear ${armor.value}.`;    return threatCode;
  }

  private generateName(charts: GangChart): string {
    const unit = this.dice.rollRandomItem<string>(charts.naming?.units);
    const adjective = this.dice.rollRandomItem<string>(
      charts.naming?.adjectives
    );
    const object = this.dice.rollRandomItem<string>(charts.naming?.objects);
    const secondObject = this.dice.rollRandomItem<string>(charts.naming?.objects);
    let name = '';
    const dieRoll = this.dice.generateNumber(1, 10);
    switch (dieRoll) {
      case 1:
        name = `${object} of ${adjective} ${secondObject}`;
        break;
      case 2:
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
      case 7:
        name = `${adjective} ${object} ${unit}`;
        break;
      default:
        name = `${adjective} ${object}`;
    }

    return name;
  }
}
