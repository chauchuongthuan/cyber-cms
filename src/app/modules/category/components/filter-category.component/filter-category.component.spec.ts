import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterPostCategoryComponent } from './filter-category.component';

describe('FilterPostCategoryComponent', () => {
  let component: FilterPostCategoryComponent;
  let fixture: ComponentFixture<FilterPostCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPostCategoryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
