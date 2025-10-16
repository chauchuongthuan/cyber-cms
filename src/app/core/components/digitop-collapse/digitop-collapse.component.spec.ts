import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DigitopCollapseComponent } from './digitop-collapse.component';
import { DigitopCollapseModule } from './digitop-collapse.module';

describe('DigitopCollapseComponent', () => {
  let component: DigitopCollapseComponent;
  let fixture: ComponentFixture<DigitopCollapseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DigitopCollapseModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitopCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
