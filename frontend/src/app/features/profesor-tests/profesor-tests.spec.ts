import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorTests } from './profesor-tests';

describe('ProfesorTests', () => {
  let component: ProfesorTests;
  let fixture: ComponentFixture<ProfesorTests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorTests],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorTests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
