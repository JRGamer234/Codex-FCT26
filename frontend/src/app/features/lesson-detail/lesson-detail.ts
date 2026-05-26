import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LessonFormComponent } from '../lesson-form/lesson-form';


interface Section {
  title: string;
  content: string;
  code?: string;
}

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LessonFormComponent],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.scss'
})
export class LessonDetailComponent {
  showTest = false;

  lesson = {
    title: 'Introducción a HTML',
    level: 'Inicial',
    category: 'HTML',
    description: 'Aprende los fundamentos del lenguaje de marcado HTML, la base de toda página web.',
    sections: [
      {
        title: '¿Qué es HTML?',
        content: 'HTML (HyperText Markup Language) es el lenguaje estándar para crear páginas web. Define la estructura y el contenido de una página mediante etiquetas.',
        code: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi primera página</title>
  </head>
  <body>
    <h1>Hola Mundo</h1>
    <p>Mi primera página web</p>
  </body>
</html>`
      },
      {
        title: 'Etiquetas básicas',
        content: 'Las etiquetas HTML son los bloques de construcción de cualquier página. Las más comunes son los encabezados, párrafos, enlaces e imágenes.',
        code: `<h1>Encabezado principal</h1>
<h2>Subencabezado</h2>
<p>Esto es un párrafo</p>
<a href="https://ejemplo.com">Esto es un enlace</a>
<img src="imagen.jpg" alt="Descripción">`
      },
      {
        title: 'Atributos HTML',
        content: 'Los atributos proporcionan información adicional sobre los elementos HTML. Se colocan dentro de la etiqueta de apertura y tienen un nombre y un valor.',
        code: `<a href="https://ejemplo.com" target="_blank">Abrir en nueva pestaña</a>
<img src="foto.jpg" alt="Mi foto" width="300">
<input type="text" placeholder="Escribe algo...">`
      }
    ] as Section[]
  };

  startTest() {
    this.showTest = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}