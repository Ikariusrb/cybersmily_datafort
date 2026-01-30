import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SourceSelectorComponent } from './cp2020-source-selector.component';

describe('Cp2020SourceSelectorComponent', () => {
  let component: Cp2020SourceSelectorComponent;
  let fixture: ComponentFixture<Cp2020SourceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cp2020SourceSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020SourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
