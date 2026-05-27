import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Valoracion {
  alumno: string;
  leccion: string;
  estrellas: number;
  comentario: string;
  fecha: string;
}

@Component({
  selector: 'app-profesor-valoraciones',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profesor-valoraciones.html',
  styleUrl: './profesor-valoraciones.scss'
})
export class ProfesorValoracionesComponent {
  valoraciones: Valoracion[] = [
    { alumno: 'Itziar', leccion: 'Introducción a HTML', estrellas: 5, comentario: 'Muy clara y bien explicada!', fecha: 'Hoy' },
    { alumno: 'Mario', leccion: 'Flexbox', estrellas: 4, comentario: 'Buena lección, podría tener más ejemplos.', fecha: 'Ayer' },
    { alumno: 'Jorge', leccion: 'CSS Grid', estrellas: 5, comentario: 'Perfecta, lo entendí todo.', fecha: 'Hace 2 días' },
    { alumno: 'Alex', leccion: 'Animaciones CSS', estrellas: 4, comentario: 'Muy interesante!', fecha: 'Hace 3 días' },
    { alumno: 'Itziar', leccion: 'Selectores Avanzados', estrellas: 5, comentario: 'Excelente explicación de las pseudoclases.', fecha: 'Hace 4 días' },
    { alumno: 'Mario', leccion: 'Formularios en HTML', estrellas: 3, comentario: 'Le falta profundidad en algunos temas.', fecha: 'Hace 5 días' },
  ];

  get mediaEstrellas(): string {
    const media = this.valoraciones.reduce((a, v) => a + v.estrellas, 0) / this.valoraciones.length;
    return media.toFixed(1);
  }

  get totalValoraciones(): number {
    return this.valoraciones.length;
  }

  estrellas(n: number): string {
    return '⭐'.repeat(n);
  }
}