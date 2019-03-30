import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPadComponent } from './actions-pad.component';

describe('ActionsPadComponent', () => {
  let component: ActionsPadComponent;
  let fixture: ComponentFixture<ActionsPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
