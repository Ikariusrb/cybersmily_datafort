import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzVehicleListComponent } from './cr-cz-vehicle-list.component';

describe('CrCzVehicleListComponent', () => {
  let component: CrCzVehicleListComponent;
  let fixture: ComponentFixture<CrCzVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrCzVehicleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrCzVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
