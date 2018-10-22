import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationTimePanelComponent } from './preparation-time-panel.component';

describe('PreparationTimePanelComponent', () => {
  let component: PreparationTimePanelComponent;
  let fixture: ComponentFixture<PreparationTimePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreparationTimePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationTimePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
