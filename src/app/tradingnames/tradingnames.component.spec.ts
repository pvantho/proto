import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingnamesComponent } from './tradingnames.component';

describe('TradingnamesComponent', () => {
  let component: TradingnamesComponent;
  let fixture: ComponentFixture<TradingnamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingnamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingnamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
