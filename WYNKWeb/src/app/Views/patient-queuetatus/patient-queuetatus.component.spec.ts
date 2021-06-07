import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientQueuetatusComponent } from './patient-queuetatus.component';

describe('PatientQueuetatusComponent', () => {
  let component: PatientQueuetatusComponent;
  let fixture: ComponentFixture<PatientQueuetatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientQueuetatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientQueuetatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
