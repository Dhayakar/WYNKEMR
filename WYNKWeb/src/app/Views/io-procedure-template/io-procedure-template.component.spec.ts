import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoProcedureTemplateComponent } from './io-procedure-template.component';

describe('IoProcedureTemplateComponent', () => {
  let component: IoProcedureTemplateComponent;
  let fixture: ComponentFixture<IoProcedureTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoProcedureTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoProcedureTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
