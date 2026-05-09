import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnChanges, OnInit, SimpleChanges, input, output } from '@angular/core';
import { Observable } from 'rxjs';
import { iCrCzGearItemCard } from '../models/cr-cz-gear-item-card';

@Component({
    selector: 'cs-cr-cz-gear-list',
    templateUrl: './cr-cz-gear-list.component.html',
    styleUrls: ['./cr-cz-gear-list.component.css'],
    standalone: false
})
export class CrCzGearListComponent implements OnInit {
  faStar = faStar;
  faPlus = faPlus;

  filterName: string = '';
  fitlerKeyword: string = '';
  filterCred: Array<number> = [10];
  filterEB: number | undefined;
  filterReleases: Array<string> | undefined;
  currentFilterFaction: string | undefined;


  gearList = input<Array<iCrCzGearItemCard>>();
  filterFaction = input<string>('');
  teamFaction = input<string>('');
  unitKeywords = input<Array<string>>([]);
  totalStreetcred = input<number>(0);
  existingGear = input<Array<string>>([]);
  characterGear = input<Array<string>>([]);

  addGear = output<iCrCzGearItemCard>();

  ngOnInit(): void {
    this.currentFilterFaction = this.filterFaction();
    for( let i = 0; i < (this.totalStreetcred() + 1); i++) {
      this.filterCred.push(i);
    }
  }


  setFaction($event: string): void {
    this.currentFilterFaction = $event;
  }

  getCount(title: string): number {
    return this.existingGear().filter(name => name === title).length;
  }

  characterHasGear(title: string): boolean {
    return this.characterGear()?.includes(title);
  }

  checkRarity(title: string, rarity: number): boolean {
    return this.getCount(title) > rarity;
  }

  buyGear(gear: iCrCzGearItemCard) {
    this.addGear.emit(gear);
  }

  toggleCredFilter(value: number): void {
    if(!this.filterCred.includes(value)) {
      this.filterCred.push(value);
    } else {
      const index = this.filterCred.indexOf(value);
      this.filterCred.splice(index, 1);
    }
    // need to trigger the filter pipe by recreating the array.
    this.filterCred = [...this.filterCred];
  }

  filterOnRelease(event: Array<string>): void {
    this.filterReleases = [...event];

  }
}
