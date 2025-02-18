import { DataWeapon } from './data-weapon';
import { CpPlayerWeapon } from './cp-player-weapon';
import { Cp2020PlayerAmmo } from './cp-2020-player-ammo';
export class CpPlayerWeaponList {
  items: Array<CpPlayerWeapon>;
  ammo: Array<Cp2020PlayerAmmo>;

  constructor(length?: number) {
    if (length) {
      this.items = Array.from(
        { length: length },
        () => new CpPlayerWeapon()
      );
      this.sort();
    } else {
      this.items = new Array<CpPlayerWeapon>();
    }
    this.ammo = new Array<Cp2020PlayerAmmo>();
  }

  get totalCost(): number {
    return this.items.reduce((a, b) => (a += b.cost), 0);
  }

  deleteWeapon(index: number) {
    if (!isNaN(Number(index)) && index > -1) {
      this.items.splice(index, 1);
    }
  }

  addWeapon(weapon: CpPlayerWeapon) {
    this.add(weapon);
  }

  addDataWeapon(weapon: DataWeapon) {
    this.add(new CpPlayerWeapon(weapon));
  }

  addPlayerWeaponList(weapons: Array<CpPlayerWeapon>) {
    weapons.forEach((wpn) => this.addWeapon(wpn));
  }

  addDataWeaponList(weapons: Array<DataWeapon>) {
    if (weapons && weapons.length > 0) {
      weapons.forEach((wpn) => {
        this.addDataWeapon(wpn);
      });
    }
  }

  updateWeapon(index: number, weapon: CpPlayerWeapon) {
    if (!isNaN(Number(index)) && index > -1 && weapon) {
      this.items[index] = weapon;
      this.sort();
    }
  }

  private sort() {
    this.items = this.items.sort( (a, b) => {
      if (a.name === '' || !a.name) {return 1;}
      if (b.name === '' || !b.name) {return -1;}
      return a.name.localeCompare(b.name)});
  }

  private removeBlank() {
    const index = this.items.findIndex( a => a.name === '' && a.notes === '' );
    if (index > -1 ) {
      this.items.splice(index, 1);
    }
  }

  private add(weapon: CpPlayerWeapon) {
    this.items.push(weapon);
    this.removeBlank();
    this.sort();
  }
}
