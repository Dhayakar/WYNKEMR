import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceVSmiddlemanComponent } from './insurance-vsmiddleman.component';

describe('InsuranceVSmiddlemanComponent', () => {
  let component: InsuranceVSmiddlemanComponent;
  let fixture: ComponentFixture<InsuranceVSmiddlemanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceVSmiddlemanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceVSmiddlemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
