import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterCustomerCareTypeComponent } from './filter-customer-care-type.component';

describe('FilterCustomerCareTypeComponent', () => {
  let component: FilterCustomerCareTypeComponent;
  let fixture: ComponentFixture<FilterCustomerCareTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCustomerCareTypeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCustomerCareTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
