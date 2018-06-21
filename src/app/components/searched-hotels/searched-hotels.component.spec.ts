import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedHotelsComponent } from './searched-hotels.component';

describe('SearchedHotelsComponent', () => {
  let component: SearchedHotelsComponent;
  let fixture: ComponentFixture<SearchedHotelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedHotelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
