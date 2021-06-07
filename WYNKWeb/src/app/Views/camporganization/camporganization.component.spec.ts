import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamporganizationComponent } from './camporganization.component';

describe('CamporganizationComponent', () => {
  let component: CamporganizationComponent;
  let fixture: ComponentFixture<CamporganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamporganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamporganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
