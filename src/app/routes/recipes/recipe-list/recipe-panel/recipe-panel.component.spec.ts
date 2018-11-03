import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePanelComponent } from './recipe-panel.component';

describe('RecipePanelComponent', () => {
  let component: RecipePanelComponent;
  let fixture: ComponentFixture<RecipePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
