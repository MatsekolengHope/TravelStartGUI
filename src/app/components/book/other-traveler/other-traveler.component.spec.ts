import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTravelerComponent } from './other-traveler.component';

describe('OtherTravelerComponent', () => {
  let component: OtherTravelerComponent;
  let fixture: ComponentFixture<OtherTravelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherTravelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
