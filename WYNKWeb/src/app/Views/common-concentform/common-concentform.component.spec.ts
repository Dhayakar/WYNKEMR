import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonConcentformComponent } from './common-concentform.component';

describe('CommonConcentformComponent', () => {
  let component: CommonConcentformComponent;
  let fixture: ComponentFixture<CommonConcentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonConcentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonConcentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
