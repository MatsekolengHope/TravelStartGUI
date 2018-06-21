import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedFlightsComponent } from './searched-flights.component';

describe('SearchedFlightsComponent', () => {
  let component: SearchedFlightsComponent;
  let fixture: ComponentFixture<SearchedFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
