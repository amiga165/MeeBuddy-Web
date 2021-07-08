import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAnyitemComponent } from './order-anyitem.component';

describe('OrderAnyitemComponent', () => {
  let component: OrderAnyitemComponent;
  let fixture: ComponentFixture<OrderAnyitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAnyitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAnyitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
