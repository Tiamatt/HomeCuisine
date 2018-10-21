import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsPanelComponent } from './directions-panel.component';

describe('DirectionsPanelComponent', () => {
  let component: DirectionsPanelComponent;
  let fixture: ComponentFixture<DirectionsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
