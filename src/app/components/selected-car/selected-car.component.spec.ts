import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCarComponent } from './selected-car.component';

describe('SelectedCarComponent', () => {
  let component: SelectedCarComponent;
  let fixture: ComponentFixture<SelectedCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
