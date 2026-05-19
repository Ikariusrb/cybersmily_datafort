import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CrCzVehicleCardComponent } from './cr-cz-vehicle-card.component';

describe('CrCzVehicleCardComponent', () => {
  let component: CrCzVehicleCardComponent;
  let fixture: ComponentFixture<CrCzVehicleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrCzVehicleCardComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CrCzVehicleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
