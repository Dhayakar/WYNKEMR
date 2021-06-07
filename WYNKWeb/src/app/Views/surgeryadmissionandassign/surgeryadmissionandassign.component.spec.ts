import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryadmissionandassignComponent } from './surgeryadmissionandassign.component';

describe('SurgeryadmissionandassignComponent', () => {
  let component: SurgeryadmissionandassignComponent;
  let fixture: ComponentFixture<SurgeryadmissionandassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryadmissionandassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryadmissionandassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
