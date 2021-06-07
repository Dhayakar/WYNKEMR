import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpInvestigationComponent } from './ip-investigation.component';

describe('IpInvestigationComponent', () => {
  let component: IpInvestigationComponent;
  let fixture: ComponentFixture<IpInvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpInvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
