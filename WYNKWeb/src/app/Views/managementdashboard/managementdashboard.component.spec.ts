import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementdashboardComponent } from './managementdashboard.component';

describe('ManagementdashboardComponent', () => {
  let component: ManagementdashboardComponent;
  let fixture: ComponentFixture<ManagementdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
