import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorAlumnos } from './profesor-alumnos';

describe('ProfesorAlumnos', () => {
  let component: ProfesorAlumnos;
  let fixture: ComponentFixture<ProfesorAlumnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorAlumnos],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorAlumnos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
