import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsscheduledpatientsComponent } from './appointmentsscheduledpatients.component';

describe('AppointmentsscheduledpatientsComponent', () => {
  let component: AppointmentsscheduledpatientsComponent;
  let fixture: ComponentFixture<AppointmentsscheduledpatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsscheduledpatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsscheduledpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
