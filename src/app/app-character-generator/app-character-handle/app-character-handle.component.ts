import { faDice } from '@fortawesome/free-solid-svg-icons';
import { NameGeneratorService } from './../../shared/services/namegen/name-generator.service';
import { Component, OnInit, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'cs-app-character-handle',
    templateUrl: './app-character-handle.component.html',
    styleUrls: ['./app-character-handle.component.css'],
    standalone: true,
    imports: [FormsModule, FontAwesomeModule]
})
export class AppCharacterHandleComponent implements OnInit {
  faDice = faDice;

  handle = model<string>();
  changeHandle = output<string>();

  constructor(private nameService: NameGeneratorService) { }

  ngOnInit() {
  }

  onHandleChange() {
    this.changeHandle.emit(this.handle());
  }

  rollName() {
    this.nameService.generateName().subscribe( name => {
      this.handle.set(name);
      this.onHandleChange();
    });
  }
}
