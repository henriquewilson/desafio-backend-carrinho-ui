import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateCartComponent } from './form-create-cart.component';

describe('FormCreateCartComponent', () => {
  let component: FormCreateCartComponent;
  let fixture: ComponentFixture<FormCreateCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
