import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheCartComponent } from './the-cart.component';

describe('TheCartComponent', () => {
  let component: TheCartComponent;
  let fixture: ComponentFixture<TheCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
