import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAdminProfileComponent } from './hotel-admin-profile.component';

describe('HotelAdminProfileComponent', () => {
  let component: HotelAdminProfileComponent;
  let fixture: ComponentFixture<HotelAdminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelAdminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
