import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalproductsComponent } from './localproducts.component';

describe('LocalproductsComponent', () => {
  let component: LocalproductsComponent;
  let fixture: ComponentFixture<LocalproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
