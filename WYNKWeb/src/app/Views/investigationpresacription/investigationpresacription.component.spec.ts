import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationpresacriptionComponent } from './investigationpresacription.component';

describe('InvestigationpresacriptionComponent', () => {
  let component: InvestigationpresacriptionComponent;
  let fixture: ComponentFixture<InvestigationpresacriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationpresacriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationpresacriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
