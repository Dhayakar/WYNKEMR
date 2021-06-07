import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtConsumptionComponent } from './ot-consumption.component';

describe('OtConsumptionComponent', () => {
  let component: OtConsumptionComponent;
  let fixture: ComponentFixture<OtConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
