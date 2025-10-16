import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DigitopUploadComponent } from './digitop-upload.component';

describe('DigitopUploadComponent', () => {
  let component: DigitopUploadComponent;
  let fixture: ComponentFixture<DigitopUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DigitopUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitopUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
