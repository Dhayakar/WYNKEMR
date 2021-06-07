import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreoperativeComponent } from './preoperative.component';

describe('PreoperativeComponent', () => {
  let component: PreoperativeComponent;
  let fixture: ComponentFixture<PreoperativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreoperativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreoperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
