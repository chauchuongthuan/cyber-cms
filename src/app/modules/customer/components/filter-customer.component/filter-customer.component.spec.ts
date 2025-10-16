import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterCustomerComponent } from './filter-customer.component';

describe('FilterCustomerComponent', () => {
  let component: FilterCustomerComponent;
  let fixture: ComponentFixture<FilterCustomerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCustomerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
