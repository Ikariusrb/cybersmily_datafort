import { SkillListService } from './../../shared/cp2020/cp2020-skills/services';
import { CmbtTrckOpponent } from '../../shared/models/cmbt-trck';
import { Cp2020PlayerSkill, DataSkill, FumbleChart, SkillLevelSpread } from './../../shared/cp2020/cp2020-skills/models';
import { DiceService } from './../../shared/services/dice/dice.service';
import { faDice, faTrash, faPlus, faAngleDoubleDown, faAngleDoubleRight, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trk-skills',
  templateUrl: './cmbt-trk-skills.component.html',
  styleUrls: ['./cmbt-trk-skills.component.css']
})
export class CmbtTrkSkillsComponent implements OnInit, OnChanges {
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  dice = faDice;
  faTrash = faTrash;
  faPlus = faPlus;

  @Input()
  isCollapsed = false;

  @Input()
  opponent: CmbtTrckOpponent = new CmbtTrckOpponent();

  @Output()
  updateOpponent = new EventEmitter<CmbtTrckOpponent>();

  newSkill: Cp2020PlayerSkill = new Cp2020PlayerSkill();

  selectSkill: DataSkill = null;
  selectSA: DataSkill = null;

  specialAbilites: Array<DataSkill> = new Array<DataSkill>();
  skills: Array<DataSkill> = new Array<DataSkill>();
  skillResults = '';


  constructor(private diceRoll: DiceService, private skillList: SkillListService) { }

  ngOnInit() {
    if (this.skills.length < 1) {
      this.skillList.Skills.subscribe( list => {
        this.skills = list.filter( sk => !sk.sa);
        this.specialAbilites = list.filter( sk => sk.sa);
      });
    }
  }

  ngOnChanges() {
    if (!this.opponent.sa || !this.opponent.sa.name || this.opponent.sa.name === '') {
      this.selectSA = null;
    }
    this.newSkill = new Cp2020PlayerSkill();
    this.selectSkill = null;
  }

  addSKill() {
    if(this.newSkill.name === '') {
      this.newSkill.name = `skill ${this.opponent.skills.length + 1}`;
    }
    this.opponent.addSkill( new Cp2020PlayerSkill(this.newSkill));
    this.newSkill = new Cp2020PlayerSkill();
    this.updateOpponent.emit(this.opponent);
  }

  changeSkill() {
    this.newSkill = new Cp2020PlayerSkill(this.selectSkill);
  }

  changeSA() {
    this.opponent.sa.name = this.selectSA.name;
    this.opponent.sa.stat = this.selectSA.stat;
    this.updateOpponent.emit(this.opponent);
  }

  rollSkill(skill: Cp2020PlayerSkill) {
    let roll = this.diceRoll.generateNumber(1, 10);
    const total = [roll];
    while (roll === 10) {
      roll =  this.diceRoll.generateNumber(1, 10);
      total.push(roll);
    }
    const result = total.reduce((a, b) => a + b) + skill.value + this.opponent.stats[skill.stat.toUpperCase()].Adjusted;
    let status = '';
    if (total[0] === 1 ) {
      status =  'Fumbled! ' + FumbleChart.getResults(this.diceRoll.generateNumber(1, 10), skill) + ' ';
    }
    if (total[0] === 10 ) {
      status = 'Critical! ';
    }

    this.skillResults = status + total.join(' + ') + '(Rolls)  + '
    + this.getStatValue(skill.stat.toUpperCase())
    + '(stat) + '
    +  skill.value + '(skill) = ' + result;
  }

  getStatValue(stat: string): number {
    return this.opponent?.stats[stat?.toUpperCase()]?.Adjusted ?? 0;
  }

  generateSkillLevels() {
    if (this.opponent.skills.length < 1) {
      alert('Need to add skills. This button will fill them in with random values.');
    } else {
      const spread = new SkillLevelSpread(this.diceRoll);
      this.opponent.skills.map( sk => sk.value = spread.normal);
      this.opponent.sa.value = this.diceRoll.generateNumber(1, 10);
      this.updateOpponent.emit(this.opponent);
    }
  }

  deleteSA() {
    this.opponent.sa = new Cp2020PlayerSkill({name: '', stat: '', value: 0, sa: true});
    this.updateOpponent.emit(this.opponent);
  }

  deleteSkill(index: number) {
    this.opponent.skills.splice(index, 1);
    this.updateOpponent.emit(this.opponent);
  }

}
