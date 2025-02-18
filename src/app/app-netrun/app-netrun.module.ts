import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NrLoadMapsService } from './services/nr-load-maps.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppNetrunRoutingModule } from './app-netrun-routing.module';

import { NrmainComponent } from './nrmain/nrmain.component';
import { NrinstructComponent } from './nrinstruct/nrinstruct.component';
import { NrdebugComponent } from './nrdebug/nrdebug.component';
import { NrnavigatorComponent } from './nrnavigator/nrnavigator.component';
import { NrmapComponent } from './nrmap/nrmap.component';
import { NrgridboxComponent } from './nrgridbox/nrgridbox.component';
import { NrDatafortComponent } from './nr-datafort/nr-datafort.component';
import { NrTraceviewComponent } from './nr-traceview/nr-traceview.component';

import { DiceService } from '../shared/services/dice/dice.service';
import { NrMapDataService, NrTrackerService, NrMapPositionService, NrMapGridService } from './services';
import { NrMapGridComponent } from './nr-map-grid/nr-map-grid.component';
import { NrMapCellComponent } from './nr-map-cell/nr-map-cell.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  imports: [
    CommonModule,
    CommonUiModule,
    NgxUiLoaderModule,
    AppNetrunRoutingModule
  ],
  declarations: [
    NrmainComponent,
    NrinstructComponent,
    NrdebugComponent,
    NrnavigatorComponent,
    NrmapComponent,
    NrgridboxComponent,
    NrDatafortComponent,
    NrTraceviewComponent,
    NrMapGridComponent,
    NrMapCellComponent
  ],
  providers: [
    NrMapDataService,
    NrMapGridService,
    NrMapPositionService,
    NrTrackerService,
    NrLoadMapsService,
    DiceService
  ]
})
export class AppNetrunModule { }
