import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampmasterComponent } from './campmaster.component';

describe('CampmasterComponent', () => {
  let component: CampmasterComponent;
  let fixture: ComponentFixture<CampmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
