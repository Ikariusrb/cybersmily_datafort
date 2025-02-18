import { GangPdfService } from './services/gang-pdf/gang-pdf.service';
import { GangDataService } from './services/gang-data/gang-data.service';
import { GangGeneratorService } from './services/gang-generator/gang-generator.service';
import { DataService } from './../../services/file-services/dataservice/data.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GangDisplayComponent } from './components/gang-display/gang-display.component';
import { GangGeneratorDisplayComponent } from './components/gang-generator-display/gang-generator-display.component';

@NgModule({
  declarations: [GangDisplayComponent, GangGeneratorDisplayComponent],
  exports: [GangDisplayComponent, GangGeneratorDisplayComponent],
  imports: [CommonModule, CommonUiModule],
  providers: [
    DiceService,
    DataService,
    GangGeneratorService,
    GangDataService,
    GangPdfService,
  ],
})
export class GangGeneratorModule {}
