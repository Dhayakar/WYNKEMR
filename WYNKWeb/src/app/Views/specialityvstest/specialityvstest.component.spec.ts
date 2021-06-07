import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityvstestComponent } from './specialityvstest.component';

describe('SpecialityvstestComponent', () => {
  let component: SpecialityvstestComponent;
  let fixture: ComponentFixture<SpecialityvstestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityvstestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityvstestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
