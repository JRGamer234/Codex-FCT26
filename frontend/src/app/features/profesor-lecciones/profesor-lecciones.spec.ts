import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorLecciones } from './profesor-lecciones';

describe('ProfesorLecciones', () => {
  let component: ProfesorLecciones;
  let fixture: ComponentFixture<ProfesorLecciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorLecciones],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorLecciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
