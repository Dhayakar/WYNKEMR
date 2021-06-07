import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulksmsTemplateComponent } from './bulksms-template.component';

describe('BulksmsTemplateComponent', () => {
  let component: BulksmsTemplateComponent;
  let fixture: ComponentFixture<BulksmsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulksmsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulksmsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
