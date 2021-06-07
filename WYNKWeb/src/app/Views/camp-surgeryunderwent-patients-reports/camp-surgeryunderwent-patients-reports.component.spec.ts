import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampSurgeryunderwentPatientsReportsComponent } from './camp-surgeryunderwent-patients-reports.component';

describe('CampSurgeryunderwentPatientsReportsComponent', () => {
  let component: CampSurgeryunderwentPatientsReportsComponent;
  let fixture: ComponentFixture<CampSurgeryunderwentPatientsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampSurgeryunderwentPatientsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampSurgeryunderwentPatientsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
