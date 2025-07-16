import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpatientComponent } from './dashboardpatient.component';

describe('DashboardpatientComponent', () => {
  let component: DashboardpatientComponent;
  let fixture: ComponentFixture<DashboardpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardpatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
