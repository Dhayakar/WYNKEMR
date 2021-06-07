import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisvsmedicineComponent } from './diagnosisvsmedicine.component';

describe('DiagnosisvsmedicineComponent', () => {
  let component: DiagnosisvsmedicineComponent;
  let fixture: ComponentFixture<DiagnosisvsmedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisvsmedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisvsmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
