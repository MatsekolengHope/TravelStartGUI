import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedCarsComponent } from './searched-cars.component';

describe('SearchedCarsComponent', () => {
  let component: SearchedCarsComponent;
  let fixture: ComponentFixture<SearchedCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
