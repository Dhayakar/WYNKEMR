import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistCounsellingComponent } from './checklist-counselling.component';

describe('ChecklistCounsellingComponent', () => {
  let component: ChecklistCounsellingComponent;
  let fixture: ComponentFixture<ChecklistCounsellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistCounsellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistCounsellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
