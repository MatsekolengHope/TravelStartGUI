import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAdminProfileComponent } from './car-admin-profile.component';

describe('CarAdminProfileComponent', () => {
  let component: CarAdminProfileComponent;
  let fixture: ComponentFixture<CarAdminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarAdminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
