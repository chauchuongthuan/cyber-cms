import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DigitopDrawerComponent } from './digitop-drawer.component';

describe('DigitopDrawerComponent', () => {
  let component: DigitopDrawerComponent;
  let fixture: ComponentFixture<DigitopDrawerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DigitopDrawerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitopDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
