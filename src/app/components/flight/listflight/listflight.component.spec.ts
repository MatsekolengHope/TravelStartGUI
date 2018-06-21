import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListflightComponent } from './listflight.component';

describe('ListflightComponent', () => {
  let component: ListflightComponent;
  let fixture: ComponentFixture<ListflightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListflightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
