import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LessonFormComponent } from '../lesson-form/lesson-form';

interface Section {
  title: string;
  content: string;
  code?: string;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface Lesson {
  id: number;
  title: string;
  level: string;
  category: string;
  description: string;
  sections: Section[];
  questions: Question[];
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
          code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Mi primera página</title>\n  </head>\n  <body>\n    <h1>Hola Mundo</h1>\n  </body>\n</html>`
        },
        {
          title: 'Etiquetas básicas',
          content: 'Las etiquetas más comunes son los encabezados, párrafos, enlaces e imágenes.',
          code: `<h1>Encabezado</h1>\n<p>Párrafo</p>\n<a href="#">Enlace</a>\n<img src="foto.jpg" alt="Foto">`
        }
      ],
      questions: [
        { question: '¿Qué significa HTML?', options: ['HyperText Markup Language', 'HighText Machine Language', 'HyperText and links Markup Language', 'None of the above'], correct: 0 },
        { question: '¿Cuál es la etiqueta para un párrafo?', options: ['<paragraph>', '<p>', '<par>', '<pg>'], correct: 1 },
        { question: '¿Qué etiqueta se usa para un enlace?', options: ['<link>', '<a>', '<href>', '<url>'], correct: 1 },
        { question: '¿Qué etiqueta es el encabezado principal?', options: ['<h2>', '<head>', '<h1>', '<header>'], correct: 2 },
        { question: '¿Qué atributo necesita la etiqueta img?', options: ['href', 'src', 'link', 'url'], correct: 1 }
      ]
    },
    {
      id: 2,
      title: 'Flexbox y Grid',
      level: 'Intermedio',
      category: 'Layout',
      description: 'Domina los sistemas de layout modernos de CSS.',
      sections: [
        {
          title: '¿Qué es Flexbox?',
          content: 'Flexbox es un modelo de layout unidimensional para distribuir elementos en filas o columnas.',
          code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`
        },
        {
          title: '¿Qué es CSS Grid?',
          content: 'CSS Grid es un sistema bidimensional para crear layouts con filas y columnas.',
          code: `.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}`
        }
      ],
      questions: [
        { question: '¿Qué propiedad activa Flexbox?', options: ['display: block', 'display: flex', 'display: grid', 'display: inline'], correct: 1 },
        { question: '¿Qué propiedad centra elementos en Flexbox horizontalmente?', options: ['align-items', 'justify-content', 'flex-wrap', 'gap'], correct: 1 },
        { question: '¿Qué propiedad activa CSS Grid?', options: ['display: flex', 'display: block', 'display: grid', 'display: table'], correct: 2 },
        { question: '¿Qué significa 1fr en Grid?', options: ['1 pixel', '1 fracción del espacio disponible', '1 porcentaje', '1 em'], correct: 1 },
        { question: '¿Qué propiedad añade espacio entre elementos en Grid?', options: ['margin', 'padding', 'gap', 'spacing'], correct: 2 }
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
          content: 'Las transiciones permiten cambiar valores de propiedades CSS de forma suave.',
          code: `.boton {\n  background: blue;\n  transition: background 0.3s ease;\n}\n.boton:hover {\n  background: red;\n}`
        },
        {
          title: 'Animaciones con @keyframes',
          content: 'Los keyframes definen los pasos intermedios de una animación CSS.',
          code: `@keyframes aparecer {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.elemento {\n  animation: aparecer 1s ease;\n}`
        }
      ],
      questions: [
        { question: '¿Qué propiedad define una transición CSS?', options: ['animation', 'transform', 'transition', 'keyframe'], correct: 2 },
        { question: '¿Qué regla se usa para crear animaciones personalizadas?', options: ['@media', '@keyframes', '@animation', '@transition'], correct: 1 },
        { question: '¿Qué propiedad aplica una animación a un elemento?', options: ['transition', 'transform', 'animation', 'keyframe'], correct: 2 },
        { question: '¿Qué valor de timing hace la animación más natural?', options: ['linear', 'ease', 'step-start', 'none'], correct: 1 },
        { question: '¿Qué propiedad rota un elemento?', options: ['transition', 'animation', 'transform: rotate()', 'display'], correct: 2 }
      ]
    },
    {
      id: 4,
      title: 'Selectores Avanzados',
      level: 'Inicial',
      category: 'CSS',
      description: 'Aprende a seleccionar elementos HTML con precisión.',
      sections: [
        {
          title: 'Selectores de atributo',
          content: 'Los selectores de atributo permiten seleccionar elementos según sus atributos.',
          code: `a[href] { color: blue; }\ninput[type="text"] { border: 1px solid gray; }`
        },
        {
          title: 'Pseudoclases',
          content: 'Las pseudoclases seleccionan elementos según su estado o posición.',
          code: `a:hover { color: red; }\nli:first-child { font-weight: bold; }\ninput:focus { outline: 2px solid blue; }`
        }
      ],
      questions: [
        { question: '¿Cómo se selecciona un input de tipo texto en CSS?', options: ['input.text', 'input[type="text"]', 'input:text', '#text'], correct: 1 },
        { question: '¿Qué pseudoclase se activa al pasar el ratón?', options: [':focus', ':active', ':hover', ':visited'], correct: 2 },
        { question: '¿Qué pseudoclase selecciona el primer hijo?', options: [':first', ':first-child', ':nth-child(1)', ':child-first'], correct: 1 },
        { question: '¿Qué selector selecciona elementos con un atributo específico?', options: ['.atributo', '#atributo', '[atributo]', '*atributo'], correct: 2 },
        { question: '¿Qué pseudoclase se activa cuando un input tiene el foco?', options: [':hover', ':active', ':visited', ':focus'], correct: 3 }
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