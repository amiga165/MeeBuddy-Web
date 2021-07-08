import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmodalComponent } from './locationmodal.component';

describe('LocationmodalComponent', () => {
  let component: LocationmodalComponent;
  let fixture: ComponentFixture<LocationmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
