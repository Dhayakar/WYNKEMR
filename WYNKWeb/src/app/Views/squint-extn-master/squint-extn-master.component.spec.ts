import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquintExtnMasterComponent } from './squint-extn-master.component';

describe('SquintExtnMasterComponent', () => {
  let component: SquintExtnMasterComponent;
  let fixture: ComponentFixture<SquintExtnMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquintExtnMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquintExtnMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
