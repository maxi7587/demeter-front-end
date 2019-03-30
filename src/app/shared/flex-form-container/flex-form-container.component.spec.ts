import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexFormContainerComponent } from './flex-form-container.component';

describe('FlexFormContainerComponent', () => {
  let component: FlexFormContainerComponent;
  let fixture: ComponentFixture<FlexFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
