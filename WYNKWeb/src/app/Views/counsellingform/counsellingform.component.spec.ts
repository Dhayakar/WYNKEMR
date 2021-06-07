import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellingformComponent } from './counsellingform.component';

describe('CounsellingformComponent', () => {
  let component: CounsellingformComponent;
  let fixture: ComponentFixture<CounsellingformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellingformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
