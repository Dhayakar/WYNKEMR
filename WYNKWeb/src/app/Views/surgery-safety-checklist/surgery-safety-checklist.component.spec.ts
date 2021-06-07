import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgerySafetyChecklistComponent } from './surgery-safety-checklist.component';

describe('SurgerySafetyChecklistComponent', () => {
  let component: SurgerySafetyChecklistComponent;
  let fixture: ComponentFixture<SurgerySafetyChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgerySafetyChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgerySafetyChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
