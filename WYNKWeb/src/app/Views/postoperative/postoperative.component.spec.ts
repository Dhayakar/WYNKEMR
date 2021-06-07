import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostoperativeComponent } from './postoperative.component';

describe('PostoperativeComponent', () => {
  let component: PostoperativeComponent;
  let fixture: ComponentFixture<PostoperativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostoperativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostoperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
