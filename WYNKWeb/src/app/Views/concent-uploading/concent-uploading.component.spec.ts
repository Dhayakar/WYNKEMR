import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentUploadingComponent } from './concent-uploading.component';

describe('ConcentUploadingComponent', () => {
  let component: ConcentUploadingComponent;
  let fixture: ComponentFixture<ConcentUploadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcentUploadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentUploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
