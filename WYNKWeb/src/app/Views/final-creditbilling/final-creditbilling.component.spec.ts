import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCreditbillingComponent } from './final-creditbilling.component';

describe('FinalCreditbillingComponent', () => {
  let component: FinalCreditbillingComponent;
  let fixture: ComponentFixture<FinalCreditbillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalCreditbillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalCreditbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
