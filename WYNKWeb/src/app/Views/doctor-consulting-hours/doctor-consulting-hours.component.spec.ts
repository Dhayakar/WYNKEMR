import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConsultingHoursComponent } from './doctor-consulting-hours.component';

describe('DoctorConsultingHoursComponent', () => {
  let component: DoctorConsultingHoursComponent;
  let fixture: ComponentFixture<DoctorConsultingHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorConsultingHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorConsultingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
