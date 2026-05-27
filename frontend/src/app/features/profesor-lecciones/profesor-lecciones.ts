import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Leccion {
  id: number;
  title: string;
  level: string;
  category: string;
}

@Component({
  selector: 'app-profesor-lecciones',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './profesor-lecciones.html',
  styleUrl: './profesor-lecciones.scss'
})
export class ProfesorLeccionesComponent {
  showForm = false;

  lecciones: Leccion[] = [
    { id: 1, title: 'Introducción a HTML', level: 'Inicial', category: 'HTML' },
    { id: 2, title: 'Flexbox y Grid', level: 'Intermedio', category: 'Layout' },
    { id: 3, title: 'Animaciones CSS', level: 'Avanzado', category: 'CSS' },
    { id: 4, title: 'Selectores Avanzados', level: 'Inicial', category: 'CSS' },
    { id: 5, title: 'Formularios en HTML', level: 'Inicial', category: 'HTML' },
    { id: 6, title: 'Flexbox', level: 'Intermedio', category: 'Layout' },
    { id: 7, title: 'CSS Grid', level: 'Intermedio', category: 'Grid' },
  ];

  leccionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.leccionForm = this.fb.group({
      title: ['', Validators.required],
      level: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  crearLeccion() {
    if (this.leccionForm.invalid) return;
    const nueva: Leccion = {
      id: this.lecciones.length + 1,
      ...this.leccionForm.value
    };
    this.lecciones.push(nueva);
    this.leccionForm.reset();
    this.showForm = false;
  }

  eliminarLeccion(id: number) {
    this.lecciones = this.lecciones.filter(l => l.id !== id);
  }
}