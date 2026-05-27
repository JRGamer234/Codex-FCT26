import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorValoraciones } from './profesor-valoraciones';

describe('ProfesorValoraciones', () => {
  let component: ProfesorValoraciones;
  let fixture: ComponentFixture<ProfesorValoraciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorValoraciones],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorValoraciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
