import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampScreenedpatientsReportsComponent } from './camp-screenedpatients-reports.component';

describe('CampScreenedpatientsReportsComponent', () => {
  let component: CampScreenedpatientsReportsComponent;
  let fixture: ComponentFixture<CampScreenedpatientsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampScreenedpatientsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampScreenedpatientsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
