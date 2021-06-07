import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSTemplateComponent } from './smstemplate.component';

describe('SMSTemplateComponent', () => {
  let component: SMSTemplateComponent;
  let fixture: ComponentFixture<SMSTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMSTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SMSTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
