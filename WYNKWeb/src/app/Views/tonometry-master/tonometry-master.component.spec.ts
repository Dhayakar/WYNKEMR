import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonometryMasterComponent } from './tonometry-master.component';

describe('TonometryMasterComponent', () => {
  let component: TonometryMasterComponent;
  let fixture: ComponentFixture<TonometryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonometryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonometryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
