import { Component, inject, input,output, model, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SourcesDataService } from '../cp2020-lifepath/services';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { faBook, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonUiModule } from "../../modules/common-ui/common-ui.module";
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { TitleValue } from '../../models/title-value';

@Component({
  selector: 'cs-cp2020-source-selector',
  standalone: true,
  templateUrl: './cp2020-source-selector.component.html',
  styleUrl: './cp2020-source-selector.component.css',
  imports: [FormsModule, AsyncPipe, CommonUiModule, PopoverModule , ButtonModule]
})
export class Cp2020SourceSelectorComponent {
  faBook = faBook;
  faTimes = faTimes;
  faCheck = faCheck;
  @ViewChild('poSourceBook') sourceBook!: Popover;

  sourcesListService$ = inject(SourcesDataService);
  buttonSize = input<string>("lg");
  defaultSource = input<string>();
  showTitle = input<boolean>(true);

  @Output()
  changeSource = new EventEmitter<string>();

  selectSource($event: string) {
    this.changeSource.emit($event);
    this.sourceBook.hide();
  }

  setLabel(sources: Array<TitleValue>): string {
    const found = sources.find( src => src.value === this.defaultSource());
    return found.title;
  }


}
