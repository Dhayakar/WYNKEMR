import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentMasterComponent } from './appointment-master.component';

describe('AppointmentMasterComponent', () => {
  let component: AppointmentMasterComponent;
  let fixture: ComponentFixture<AppointmentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
