import { GangPdfService } from './../../services/gang-pdf/gang-pdf.service';
import { faDice, faRedo, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { GangGeneratorService } from './../../services/gang-generator/gang-generator.service';
import { Component, computed, inject, signal } from '@angular/core';
import { CpGang } from '../../models';

@Component({
    selector: 'cs-gang-generator-display',
    templateUrl: './gang-generator-display.component.html',
    styleUrls: ['./gang-generator-display.component.css'],
    standalone: false
})
export class GangGeneratorDisplayComponent {
  faDice = faDice;
  faRedo = faRedo;
  faFilePdf = faFilePdf;

  private _gangGeneratorService = inject(GangGeneratorService);
  private _gangPDFService = inject(GangPdfService);

  gangList = this._gangGeneratorService.gangList;
  isEmpty = computed<boolean>(() => this.gangList().length < 1);
  count: number = 1;

  generateGangs(): void {
    this._gangGeneratorService.generateGang(this.count);
  }

  clear(): void {
    this._gangGeneratorService.clear();
  }

  savePDF(): void {
    this._gangPDFService.savePDF(this.gangList());
  }
}
