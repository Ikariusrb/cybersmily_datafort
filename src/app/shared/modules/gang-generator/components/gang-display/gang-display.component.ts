import { CpGang } from './../../models';
import { Component, input } from '@angular/core';

@Component({
    selector: 'cs-gang-display',
    templateUrl: './gang-display.component.html',
    styleUrls: ['./gang-display.component.css'],
    standalone: false
})
export class GangDisplayComponent {
  gang = input<CpGang>(new CpGang());
}
