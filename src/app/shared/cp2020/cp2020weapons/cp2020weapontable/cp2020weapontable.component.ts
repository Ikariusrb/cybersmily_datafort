import { CpWeaponListParam } from './../models/cp-weapon-list-param';
import { DataWeapon } from './../models/data-weapon';
import { Cp2020StatBlock } from './../../cp2020-stats/models/cp2020-stat-block';
import { WeaponDataService } from './../services';
import { DiceService } from './../../../services/dice/dice.service';
import { CpPlayerWeaponList, CpPlayerWeapon } from './../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faDice, faPlus, faCrosshairs, faCog, faCalculator } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkills } from './../../cp2020-skills/models';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapontable',
  templateUrl: './cp2020weapontable.component.html',
  styleUrls: ['./cp2020weapontable.component.css']
})
export class Cp2020weapontableComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  faCrosshairs = faCrosshairs;
  faCog = faCog;
  faCalculator = faCalculator;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };
  newWeapon: CpPlayerWeapon = new CpPlayerWeapon();

  wpnParam: CpWeaponListParam = {};

  @Input()
  weapons: CpPlayerWeaponList = new CpPlayerWeaponList();

  @Input()
  stats: Cp2020StatBlock = new Cp2020StatBlock();

  @Input()
  skills: Cp2020PlayerSkills = new Cp2020PlayerSkills();

  @Input()
  showRandomGenerator = false;

  @Input()
  showSelector = false;

  @Input()
  showCalculator = false;

  @Input()
  showIU = false;

  @Output()
  changeWeapons: EventEmitter<CpPlayerWeaponList> = new EventEmitter<CpPlayerWeaponList>();

  constructor(private modalService: BsModalService, private diceService: DiceService, private weaponData: WeaponDataService) { }

  ngOnInit(): void {
    this.wpnParam = {
      type: ['PISTOLS', 'SMG', 'RIFLES', 'MELEE', 'SHOTGUNS'],
      subtype: ['LIGHT','MEDIUM','HEAVY','ASSAULT'],
      availability: ['E', 'C']
    };
  }

  updateWeapon(data: {index: number, weapon: CpPlayerWeapon}) {
    this.weapons.updateWeapon(data.index, data.weapon);
    this.changeWeapons.emit(this.weapons);
  }

  deleteWeapon(index: number) {
    this.weapons.deleteWeapon(index);
    this.changeWeapons.emit(this.weapons);
  }

  addWeapon(wpn: CpPlayerWeapon) {
    this.weapons.addWeapon(wpn);
    this.changeWeapons.emit(this.weapons);
  }

  addWeaponList(wpnList: Array<CpPlayerWeapon>) {
    this.weapons.addPlayerWeaponList(wpnList);
    this.changeWeapons.emit(this.weapons);
  }

  randomGenerateWeapon() {
    this.weaponData
    .generateWeapons(1, this.diceService, this.wpnParam)
    .subscribe((data: Array<DataWeapon>) => {
      data.forEach( wpn => {
        this.weapons.addDataWeapon(wpn);
      });
      this.changeWeapons.emit(this.weapons);
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }


  paramChecked(value: Array<string>, item: string): boolean {
    return value && value.some((t) => { return t === item});
  }

  addParam($event, type: string, value: string) {
    if (type === 'category') {
      if (this.wpnParam.type) {
        if ($event.target.checked) {
          this.wpnParam.type.push(value);
        } else {
          const i = this.wpnParam.type.findIndex( t => t === value);
          this.wpnParam.type.splice(i, 1);
        }

      } else {
        this.wpnParam['type'] = new Array<string>();
        this.wpnParam.type.push(value);
      }
    }
    if (type === 'subcategory') {
      if (this.wpnParam.subtype) {
        if ($event.target.checked) {
          this.wpnParam.subtype.push(value);
        } else {
          const i = this.wpnParam.subtype.findIndex( t => t === value);
          this.wpnParam.subtype.splice(i, 1);
        }

      } else {
        this.wpnParam['subtype'] = new Array<string>();
        this.wpnParam.subtype.push(value);
      }
    }
    if (type === 'avail'){
      if (this.wpnParam.availability) {
        if ($event.target.checked) {
          this.wpnParam.availability.push(value);
        } else {
          const i = this.wpnParam.availability.findIndex( t => t === value);
          this.wpnParam.availability.splice(i, 1);
        }

      } else {
        this.wpnParam['availability'] = new Array<string>();
        this.wpnParam.availability.push(value);
      }

    }
    if (type === 'exclude') {

    }
  }

}
