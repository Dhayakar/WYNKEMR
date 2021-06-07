import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpMedicalBillingComponent } from './op-medical-billing.component';

describe('OpMedicalBillingComponent', () => {
  let component: OpMedicalBillingComponent;
  let fixture: ComponentFixture<OpMedicalBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpMedicalBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpMedicalBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
