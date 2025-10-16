import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTokenDrawComponent } from './action-token-draw.component';

describe('ActionTokenDrawComponent', () => {
  let component: ActionTokenDrawComponent;
  let fixture: ComponentFixture<ActionTokenDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionTokenDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionTokenDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
