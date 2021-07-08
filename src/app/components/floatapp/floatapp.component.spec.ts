import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatappComponent } from './floatapp.component';

describe('FloatappComponent', () => {
  let component: FloatappComponent;
  let fixture: ComponentFixture<FloatappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
