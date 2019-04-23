import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeFormComponent } from './contract-type-form.component';

describe('ContractTypeFormComponent', () => {
  let component: ContractTypeFormComponent;
  let fixture: ComponentFixture<ContractTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
