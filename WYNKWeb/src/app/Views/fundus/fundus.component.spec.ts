import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundusComponent } from './fundus.component';

describe('FundusComponent', () => {
  let component: FundusComponent;
  let fixture: ComponentFixture<FundusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
