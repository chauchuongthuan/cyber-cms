import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCustomerComponent } from './create-edit-customer.component';

describe('CreateEditCustomerComponent', () => {
  let component: CreateEditCustomerComponent;
  let fixture: ComponentFixture<CreateEditCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
