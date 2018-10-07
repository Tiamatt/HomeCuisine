import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsAddComponent } from './ingredients-add.component';

describe('IngredientsEditComponent', () => {
  let component: IngredientsAddComponent;
  let fixture: ComponentFixture<IngredientsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
