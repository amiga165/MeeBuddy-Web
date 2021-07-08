import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpbarComponent } from './otpbar.component';

describe('OtpbarComponent', () => {
  let component: OtpbarComponent;
  let fixture: ComponentFixture<OtpbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
