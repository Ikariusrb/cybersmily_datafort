import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzVehicleCardComponent } from './cr-cz-vehicle-card.component';

describe('CrCzVehicleCardComponent', () => {
  let component: CrCzVehicleCardComponent;
  let fixture: ComponentFixture<CrCzVehicleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrCzVehicleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrCzVehicleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
