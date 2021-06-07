import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentMasterComponent } from './treatment-master.component';

describe('TreatmentMasterComponent', () => {
  let component: TreatmentMasterComponent;
  let fixture: ComponentFixture<TreatmentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
