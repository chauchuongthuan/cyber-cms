import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPaymentComponent } from './create-edit-payment.component';

describe('CreateEditPaymentComponent', () => {
  let component: CreateEditPaymentComponent;
  let fixture: ComponentFixture<CreateEditPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
