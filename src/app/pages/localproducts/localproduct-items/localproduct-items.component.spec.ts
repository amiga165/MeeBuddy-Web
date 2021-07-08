import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalproductItemsComponent } from './localproduct-items.component';

describe('LocalproductItemsComponent', () => {
  let component: LocalproductItemsComponent;
  let fixture: ComponentFixture<LocalproductItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalproductItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalproductItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
