import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterSubscriberComponent } from './filter-subscriber.component';

describe('FilterSubscriberComponent', () => {
  let component: FilterSubscriberComponent;
  let fixture: ComponentFixture<FilterSubscriberComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSubscriberComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
