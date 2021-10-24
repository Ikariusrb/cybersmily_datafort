import { ArmorCostCalculatorService } from './../armor-cost-calculator/armor-cost-calculator.service';
import { DiceService } from './../../../../services/dice/dice.service';
import {
  CP2020ArmorRandomSettings, Cp2020ArmorPiece, ArmorOption, ArmorSpChartEntry,
  ArmorAttributeLists, PieceOfClothing
} from './../../models';
import { Injectable } from '@angular/core';
import { ArmorSettingsChoices } from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class ArmorGeneratorService {

  constructor(private armorCostCalculator: ArmorCostCalculatorService) { }

  generate(settings: CP2020ArmorRandomSettings,
    dice: DiceService,
    clothingLists: ArmorAttributeLists
  ): Cp2020ArmorPiece {

    const armor = new Cp2020ArmorPiece();
    armor.clothes = dice.rollRandomItem<PieceOfClothing>(clothingLists.clothes);

    do {
      // check if a default was set.
      if (settings.quality !== '' && armor.cost < settings.maxCost) {
        armor.quality = clothingLists.qualities.filter(q => q.name === settings.quality)[0];
      } else {
        armor.quality = dice.rollRandomItem<ArmorOption>(clothingLists.qualities);
      }

      if (settings.style !== '' && armor.cost < settings.maxCost) {
        armor.style = clothingLists.styles.filter(q => q.name === settings.style)[0];
      } else {
        armor.style = dice.rollRandomItem<ArmorOption>(clothingLists.styles);
      }

      let canBeArmor: boolean = (settings.armor === ArmorSettingsChoices.both) ? !!dice.generateNumber(0, 1) : settings.armor === ArmorSettingsChoices.armor;
      if (canBeArmor && armor.cost < settings.maxCost) {
        const spValues = clothingLists.armorChart.filter(item => item.mod[armor.clothes.wt]);
        let spRoll = dice.rollRandomItem<ArmorSpChartEntry>(spValues);
        armor.baseSP = spRoll.sp;
        armor.ev = spRoll.ev[armor.clothes.wt] ?? 0;
      }

      if (settings.hasOptions) {
        armor.options = new Array<ArmorOption>();
        // roll number of options with a low chance of getting them.
        let numOfOptions = dice.generateNumber(0, clothingLists.options.length + 3);
        numOfOptions = numOfOptions - 3;
        numOfOptions = numOfOptions > clothingLists.options.length ? clothingLists.options.length : numOfOptions;
        for (let i = 0; i < numOfOptions; i++) {
          const newOpt = dice.rollRandomItem<ArmorOption>(clothingLists.options);
          if (!armor.options.some(opt => opt.name === newOpt.name) && armor.cost < settings.maxCost) {
            armor.options.push(newOpt);
          }
        }
      }
      //check if it can be leather
      if (typeof armor.clothes.leather !== 'undefined' && armor.cost < settings.maxCost) {
        armor.isLeather = settings.isLeather ? true : (dice.generateNumber(0, 10) < 3);
      }
      armor.cost = this.armorCostCalculator.calculateCost(armor, clothingLists.armorChart);
    } while (armor.cost > settings.maxCost);

    return armor;
  }

  generateArray(settings: CP2020ArmorRandomSettings,
    dice: DiceService,
    clothingLists: ArmorAttributeLists,
    count: number
  ): Array<Cp2020ArmorPiece> {
    const list = new Array<Cp2020ArmorPiece>();
    for (let i = 0; i < count; i++) {
      list.push(this.generate(settings, dice, clothingLists));
    }
    return list;
  }

}
