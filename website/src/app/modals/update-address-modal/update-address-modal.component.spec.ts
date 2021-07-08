import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddressModalComponent } from './update-address-modal.component';

describe('LoginmodalComponent', () => {
  let component: UpdateAddressModalComponent;
  let fixture: ComponentFixture<UpdateAddressModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAddressModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
