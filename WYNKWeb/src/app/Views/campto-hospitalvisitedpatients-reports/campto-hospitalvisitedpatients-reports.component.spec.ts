import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamptoHospitalvisitedpatientsReportsComponent } from './campto-hospitalvisitedpatients-reports.component';

describe('CamptoHospitalvisitedpatientsReportsComponent', () => {
  let component: CamptoHospitalvisitedpatientsReportsComponent;
  let fixture: ComponentFixture<CamptoHospitalvisitedpatientsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamptoHospitalvisitedpatientsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamptoHospitalvisitedpatientsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
