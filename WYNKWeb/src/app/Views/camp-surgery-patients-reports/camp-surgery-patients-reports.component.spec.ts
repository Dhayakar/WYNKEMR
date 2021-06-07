import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampSurgeryPatientsReportsComponent } from './camp-surgery-patients-reports.component';

describe('CampSurgeryPatientsReportsComponent', () => {
  let component: CampSurgeryPatientsReportsComponent;
  let fixture: ComponentFixture<CampSurgeryPatientsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampSurgeryPatientsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampSurgeryPatientsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
