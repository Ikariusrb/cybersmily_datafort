import { faTimes, faPlus, faTrash, faMinus, faToolbox, faFileLines, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Component, input, signal, inject, TemplateRef, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { iCrCzVehicleCard } from '../models/cr-cz-vehicle-card';
import { iCrCzGearItemCard } from '../models/cr-cz-gear-item-card';
import { iCrCzActionToken } from '../models/cr-cz-action-token';
import { CrCzGearDataService } from '../services/cr-cz-gear-data/cr-cz-gear-data.service';
import { CreateCombatZoneVehicle } from '../functions/create-combat-zone-vehicle';
import { CrCzArmyBuilderService } from '../services/cr-cz-army-builder/cr-cz-army-builder.service';

@Component({
  selector: 'cs-cr-cz-vehicle-card',
  standalone: false,
  templateUrl: './cr-cz-vehicle-card.component.html',
  styleUrls: ['./cr-cz-vehicle-card.component.css'],
})
export class CrCzVehicleCardComponent implements OnInit, OnChanges {
  faTimes = faTimes;
  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;
  faToolbox = faToolbox;
  faFileLines = faFileLines;

  vehicleIndex = input<number>(-1);
  squadIndex = input<number>(-1);
  teamFaction = input<string>('');
  totalStreetcred = input<number>(0);
  vehicle = signal(CreateCombatZoneVehicle(null));

  private modalService = inject(BsModalService);
  private combatzoneArmyBuilder = inject(CrCzArmyBuilderService);
  private gearDataService = inject(CrCzGearDataService);

  modalRef: BsModalRef | null = null;
  modalConfig: ModalOptions = {
    class: 'modal-right modal-xl',
    animated: true,
  };

  get gearList$(): Observable<Array<iCrCzGearItemCard>> {
    return this.gearDataService.gearList;
  }

  get hullTokens(): Array<iCrCzActionToken> {
    return this.vehicle()?.hullTokens ?? [];
  }

  get hasExtraHull(): boolean {
    return this.hullTokens.some((token) => token.isExtra);
  }

  get modTotalCost(): number {
    return this.vehicle()?.mods?.reduce((total, mod) => total + (mod?.eb || 0), 0) ?? 0;
  }

  get ownedModNames(): Array<string> {
    return this.vehicle()?.mods?.map((mod) => mod.name) ?? [];
  }

  get notes(): string {
    return this.vehicle()?.notes || '';
  }

  set notes(value: string) {
    if (this.vehicle()) {
      const vehicle = this.vehicle();
      vehicle.notes = value;
    }
  }

  ngOnInit(): void {
    this.combatzoneArmyBuilder.getVehicle(this.squadIndex(), this.vehicleIndex()).subscribe(vehicle => {
      if (vehicle) {
        this.vehicle.set(vehicle);
      }
    });
  }

  ngOnChanges(): void {
    this.combatzoneArmyBuilder.getVehicle(this.squadIndex(), this.vehicleIndex()).subscribe(vehicle => {
      if (vehicle) {
        this.vehicle.set(vehicle);
      }
    });
  }

  toggleHullToken(tokenIndex: number): void {
    const vehicle = this.vehicle();
    if (vehicle && vehicle.hullTokens?.[tokenIndex]) {
      vehicle.hullTokens[tokenIndex].isRed = !vehicle.hullTokens[tokenIndex].isRed;
      this.vehicle.update(v => (CreateCombatZoneVehicle(vehicle)));
    }
  }

  addHull(action: string): void {
    const vehicle = this.vehicle();
    if (vehicle) {
      vehicle.hullTokens.push({
        type: action,
        isUsed: false,
        isRed: action === 'r',
        isExtra: true,
      });
    }
  }

  removeHull(): void {
    const vehicle = this.vehicle();
    if (vehicle && vehicle.hullTokens.length > 0) {
      const lastIndex = vehicle.hullTokens.length - 1;
      if (vehicle.hullTokens[lastIndex].isExtra) {
        vehicle.hullTokens.pop();
      }
    }
  }

  addMod(mod: iCrCzGearItemCard): void {
    if (mod && this.vehicle()) {
      this.vehicle().mods.push(mod);
      this.saveVehicle();
      this.modalRef?.hide();
    }
  }

  removeMod(modIndex: number): void {
    if (modIndex > -1 && modIndex < this.vehicle().mods.length) {
      this.vehicle().mods.splice(modIndex, 1);
      this.saveVehicle();
    }
  }

  updateNotes(notes: string): void {
    this.vehicle().notes = notes;
    this.saveVehicle();
  }

  getModCount(title: string): number {
    return this.vehicle()?.mods.filter((mod) => mod.name === title).length ?? 0;
  }

  saveVehicle(): void {
    console.log('Saving vehicle:', this.vehicle());
    this.combatzoneArmyBuilder.updateVehicle(this.squadIndex(), this.vehicleIndex(), this.vehicle()!);
  }

  showModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

}
