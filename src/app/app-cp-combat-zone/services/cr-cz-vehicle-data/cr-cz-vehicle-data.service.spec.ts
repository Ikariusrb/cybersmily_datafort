import { TestBed } from '@angular/core/testing';

import { CrCzVehicleDataService } from './cr-cz-vehicle-data.service';

describe('CrCzVehicleDataService', () => {
  let service: CrCzVehicleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzVehicleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
