import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTokenDrawComponent } from './filter-token-draw.component';

describe('FilterTokenDrawComponent', () => {
  let component: FilterTokenDrawComponent;
  let fixture: ComponentFixture<FilterTokenDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTokenDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTokenDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
