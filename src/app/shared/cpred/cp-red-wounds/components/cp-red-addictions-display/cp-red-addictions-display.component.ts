import { CpRedWoundsManagerService } from './../../services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import {
  faChevronDown,
  faChevronRight,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CpRedCharacterAddiction } from '../../models';

@Component({
  selector: 'cs-cp-red-addictions-display',
  templateUrl: './cp-red-addictions-display.component.html',
  styleUrls: ['./cp-red-addictions-display.component.css'],
})
export class CpRedAddictionsDisplayComponent implements OnInit, OnChanges {
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;

  isCollapsed = false;

  newAddiction: CpRedCharacterAddiction = new CpRedCharacterAddiction();
  selectedIndex: number = -1;

  @Input()
  addictions: Array<CpRedCharacterAddiction>;

  currAddictions: Array<CpRedCharacterAddiction> =
    new Array<CpRedCharacterAddiction>();

  constructor(private woundManager: CpRedWoundsManagerService) {}

  ngOnInit(): void {
    this.currAddictions = this.addictions.map(
      (addiction) => new CpRedCharacterAddiction(addiction)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currAddictions = this.addictions.map(
      (addiction) => new CpRedCharacterAddiction(addiction)
    );
    this.selectedIndex = -1;
  }

  add(addiction: CpRedCharacterAddiction): void {
    console.log('add', addiction);
    this.woundManager.addAddiction(new CpRedCharacterAddiction(addiction));
    this.newAddiction = new CpRedCharacterAddiction();
    this.selectedIndex = -1;
  }

  delete(addiction: CpRedCharacterAddiction): void {
    console.log('delete', addiction);
    this.woundManager.removeAddiction(addiction);
    this.selectedIndex = -1;
  }

  toggleEdit(index: number): void {
    this.selectedIndex = index === this.selectedIndex ? -1 : index;
  }

  update(param: {
    addictionName: string;
    addiction: CpRedCharacterAddiction;
  }): void {
    console.log('update', param);
    this.woundManager.updateAddiction(param.addictionName, param.addiction);
    console.log('updateIndex');
    this.selectedIndex = -1;
  }
}
