import { DiceService } from './../../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { Cp2020DatafortRandomGeneratorService } from './cp2020-datafort-random-generator.service';

describe('Cp2020DatafortRandomGeneratorService', () => {
  let service: Cp2020DatafortRandomGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ DiceService]
    });
    service = TestBed.inject(Cp2020DatafortRandomGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
