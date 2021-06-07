import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnelinemasterComponent } from './onelinemaster.component';

describe('OnelinemasterComponent', () => {
  let component: OnelinemasterComponent;
  let fixture: ComponentFixture<OnelinemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnelinemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnelinemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
