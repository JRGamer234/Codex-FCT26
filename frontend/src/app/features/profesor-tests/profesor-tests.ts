import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TestResumen {
  alumno: string;
  leccion: string;
  score: number;
  total: number;
  fecha: string;
}

@Component({
  selector: 'app-profesor-tests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profesor-tests.html',
  styleUrl: './profesor-tests.scss'
})
export class ProfesorTestsComponent {
  tests: TestResumen[] = [
    { alumno: 'Itziar', leccion: 'Introducción a HTML', score: 5, total: 5, fecha: 'Hoy' },
    { alumno: 'Mario', leccion: 'Selectores Avanzados', score: 4, total: 5, fecha: 'Ayer' },
    { alumno: 'Jorge', leccion: 'Flexbox', score: 3, total: 5, fecha: 'Hace 2 días' },
    { alumno: 'Alex', leccion: 'Formularios en HTML', score: 5, total: 5, fecha: 'Hace 3 días' },
    { alumno: 'Itziar', leccion: 'CSS Grid', score: 4, total: 5, fecha: 'Hace 4 días' },
    { alumno: 'Mario', leccion: 'Animaciones CSS', score: 3, total: 5, fecha: 'Hace 5 días' },
  ];

  get totalTests(): number {
    return this.tests.length;
  }

  get mediaScore(): string {
    const media = this.tests.reduce((a, t) => a + (t.score / t.total) * 100, 0) / this.tests.length;
    return media.toFixed(0);
  }

  get perfectos(): number {
    return this.tests.filter(t => t.score === t.total).length;
  }
}