import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LessonFormComponent } from '../lesson-form/lesson-form';

interface Section {
  title: string;
  content: string;
  code?: string;
}

interface Lesson {
  id: number;
  title: string;
  level: string;
  category: string;
  description: string;
  sections: Section[];
}

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LessonFormComponent],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.scss'
})
export class LessonDetailComponent implements OnInit {
  showTest = false;
  lesson!: Lesson;

  allLessons: Lesson[] = [
    {
      id: 1,
      title: 'Introducción a HTML',
      level: 'Inicial',
      category: 'HTML',
      description: 'Aprende los fundamentos del lenguaje de marcado HTML, la base de toda página web.',
      sections: [
        {
          title: '¿Qué es HTML?',
          content: 'HTML (HyperText Markup Language) es el lenguaje estándar para crear páginas web. Define la estructura y el contenido de una página mediante etiquetas.',
          code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Mi primera página</title>\n  </head>\n  <body>\n    <h1>Hola Mundo</h1>\n    <p>Mi primera página web</p>\n  </body>\n</html>`
        },
        {
          title: 'Etiquetas básicas',
          content: 'Las etiquetas HTML son los bloques de construcción de cualquier página. Las más comunes son los encabezados, párrafos, enlaces e imágenes.',
          code: `<h1>Encabezado principal</h1>\n<h2>Subencabezado</h2>\n<p>Esto es un párrafo</p>\n<a href="https://ejemplo.com">Esto es un enlace</a>\n<img src="imagen.jpg" alt="Descripción">`
        }
      ]
    },
    {
      id: 2,
      title: 'Flexbox y Grid',
      level: 'Intermedio',
      category: 'Layout',
      description: 'Domina los sistemas de layout modernos de CSS para crear diseños flexibles y responsivos.',
      sections: [
        {
          title: '¿Qué es Flexbox?',
          content: 'Flexbox es un modelo de layout unidimensional que permite distribuir elementos en filas o columnas con gran control sobre el alineamiento y el espacio.',
          code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}`
        },
        {
          title: '¿Qué es CSS Grid?',
          content: 'CSS Grid es un sistema de layout bidimensional que permite crear layouts complejos con filas y columnas de forma sencilla.',
          code: `.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}`
        }
      ]
    },
    {
      id: 3,
      title: 'Animaciones CSS',
      level: 'Avanzado',
      category: 'CSS',
      description: 'Aprende a crear animaciones y transiciones fluidas con CSS puro.',
      sections: [
        {
          title: 'Transiciones CSS',
          content: 'Las transiciones permiten cambiar los valores de las propiedades CSS de forma suave durante un tiempo determinado.',
          code: `.boton {\n  background: blue;\n  transition: background 0.3s ease;\n}\n\n.boton:hover {\n  background: red;\n}`
        },
        {
          title: 'Animaciones con @keyframes',
          content: 'Los keyframes permiten definir los pasos intermedios de una animación CSS con total control.',
          code: `@keyframes aparecer {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.elemento {\n  animation: aparecer 1s ease;\n}`
        }
      ]
    },
    {
      id: 4,
      title: 'Selectores Avanzados',
      level: 'Inicial',
      category: 'CSS',
      description: 'Aprende a seleccionar elementos HTML con precisión usando selectores CSS avanzados.',
      sections: [
        {
          title: 'Selectores de atributo',
          content: 'Los selectores de atributo permiten seleccionar elementos según sus atributos o valores de atributos.',
          code: `/* Elementos con atributo href */\na[href] { color: blue; }\n\n/* Inputs de tipo texto */\ninput[type="text"] { border: 1px solid gray; }`
        },
        {
          title: 'Pseudoclases',
          content: 'Las pseudoclases permiten seleccionar elementos según su estado o posición en el documento.',
          code: `a:hover { color: red; }\nli:first-child { font-weight: bold; }\ninput:focus { outline: 2px solid blue; }`
        }
      ]
    }
  ];

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const id = Number(params.get('id'));
    this.lesson = this.allLessons.find(l => l.id === id) || this.allLessons[0];
    this.showTest = false;
  });
}
  startTest() {
    this.showTest = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}