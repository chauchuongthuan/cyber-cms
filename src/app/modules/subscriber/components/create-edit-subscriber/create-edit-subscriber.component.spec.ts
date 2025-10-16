import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSubscriberComponent } from './create-edit-subscriber.component';

describe('CreateEditSubscriberComponent', () => {
  let component: CreateEditSubscriberComponent;
  let fixture: ComponentFixture<CreateEditSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditSubscriberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
