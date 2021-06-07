import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllerymasterComponent } from './allerymaster.component';

describe('AllerymasterComponent', () => {
  let component: AllerymasterComponent;
  let fixture: ComponentFixture<AllerymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllerymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllerymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
