import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoLoadComponent } from './logo-load.component';

describe('LogoLoadComponent', () => {
  let component: LogoLoadComponent;
  let fixture: ComponentFixture<LogoLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
