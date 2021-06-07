import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyPatientHistoryOrginalComponent } from './dummy-patient-history-orginal.component';

describe('DummyPatientHistoryOrginalComponent', () => {
  let component: DummyPatientHistoryOrginalComponent;
  let fixture: ComponentFixture<DummyPatientHistoryOrginalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyPatientHistoryOrginalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyPatientHistoryOrginalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
