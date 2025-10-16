import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCareTypeComponent } from './customer-care-type.component';

describe('CustomerCareTypeComponent', () => {
  let component: CustomerCareTypeComponent;
  let fixture: ComponentFixture<CustomerCareTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCareTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCareTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
