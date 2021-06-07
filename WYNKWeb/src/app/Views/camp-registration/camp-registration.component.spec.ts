import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampRegistrationComponent } from './camp-registration.component';

describe('CampRegistrationComponent', () => {
  let component: CampRegistrationComponent;
  let fixture: ComponentFixture<CampRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
