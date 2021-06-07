import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAnaestheticCheckupComponent } from './pre-anaesthetic-checkup.component';

describe('PreAnaestheticCheckupComponent', () => {
  let component: PreAnaestheticCheckupComponent;
  let fixture: ComponentFixture<PreAnaestheticCheckupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreAnaestheticCheckupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreAnaestheticCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
