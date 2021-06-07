import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingpharmacyComponent } from './billingpharmacy.component';

describe('BillingpharmacyComponent', () => {
  let component: BillingpharmacyComponent;
  let fixture: ComponentFixture<BillingpharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingpharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingpharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
