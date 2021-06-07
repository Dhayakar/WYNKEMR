import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpMedicalBillReturnsComponent } from './op-medical-bill-returns.component';

describe('OpMedicalBillReturnsComponent', () => {
  let component: OpMedicalBillReturnsComponent;
  let fixture: ComponentFixture<OpMedicalBillReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpMedicalBillReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpMedicalBillReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
