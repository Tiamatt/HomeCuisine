import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectDropdownWithCreateComponent } from './multiselect-dropdown-with-create.component';

describe('MultiselectDropdownWithCreateComponent', () => {
  let component: MultiselectDropdownWithCreateComponent;
  let fixture: ComponentFixture<MultiselectDropdownWithCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectDropdownWithCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectDropdownWithCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
