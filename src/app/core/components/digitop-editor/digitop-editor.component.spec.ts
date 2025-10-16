import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DigitopEditorComponent } from './digitop-editor.component';
import { DigitopEditorModule } from './digitop-editor.module';

describe('DigitopEditorComponent', () => {
  let component: DigitopEditorComponent;
  let fixture: ComponentFixture<DigitopEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DigitopEditorModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitopEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
