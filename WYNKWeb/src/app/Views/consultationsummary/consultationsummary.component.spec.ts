import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsummaryComponent } from './consultationsummary.component';

describe('ConsultationsummaryComponent', () => {
  let component: ConsultationsummaryComponent;
  let fixture: ComponentFixture<ConsultationsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
