import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalbillingComponent } from './Finalbilling.component';

describe('FinalbillingComponent', () => {
  let component: FinalbillingComponent;
  let fixture: ComponentFixture<FinalbillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinalbillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
