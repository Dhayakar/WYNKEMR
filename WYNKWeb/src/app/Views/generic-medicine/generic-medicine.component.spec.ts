import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMedicineComponent } from './generic-medicine.component';

describe('GenericMedicineComponent', () => {
  let component: GenericMedicineComponent;
  let fixture: ComponentFixture<GenericMedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericMedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
