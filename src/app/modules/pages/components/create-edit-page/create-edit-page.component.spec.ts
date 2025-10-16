import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPageComponent } from './create-edit-page.component';

describe('CreateEditPageComponent', () => {
  let component: CreateEditPageComponent;
  let fixture: ComponentFixture<CreateEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
