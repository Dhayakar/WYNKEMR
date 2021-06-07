import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVsInsuranceComponent } from './patient-vs-insurance.component';

describe('PatientVsInsuranceComponent', () => {
  let component: PatientVsInsuranceComponent;
  let fixture: ComponentFixture<PatientVsInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientVsInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVsInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
