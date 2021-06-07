import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationIPBillingComponent } from './investigation-ipbilling.component';

describe('InvestigationIPBillingComponent', () => {
  let component: InvestigationIPBillingComponent;
  let fixture: ComponentFixture<InvestigationIPBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationIPBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationIPBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
