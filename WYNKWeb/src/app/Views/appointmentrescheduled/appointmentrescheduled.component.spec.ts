import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentrescheduledComponent } from './appointmentrescheduled.component';

describe('AppointmentrescheduledComponent', () => {
  let component: AppointmentrescheduledComponent;
  let fixture: ComponentFixture<AppointmentrescheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentrescheduledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentrescheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
