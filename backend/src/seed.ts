import 'dotenv/config';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/codex';

const UserSchema = new mongoose.Schema({
  name: String, email: String, password: String, rol: String,
}, { timestamps: true });

const SectionSchema = new mongoose.Schema({ title: String, content: String, code: String }, { _id: false });
const QuestionSchema = new mongoose.Schema({ question: String, options: [String], correct: Number }, { _id: false });
const LessonSchema = new mongoose.Schema({
  title: String, description: String, level: String, category: String,
  sections: [SectionSchema], questions: [QuestionSchema], createdBy: String,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Lesson = mongoose.model('Lesson', LessonSchema);

const users = [
  { name: 'Alumno Demo', email: 'alumno@codex.com', password: '123456', rol: 'alumno' },
  { name: 'Profesor Demo', email: 'profesor@codex.com', password: '123456', rol: 'profesor' },
];

const lessons = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Introducción a HTML
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Introducción a HTML',
    description: 'Descubre qué es HTML, cómo funciona el navegador y aprende a construir tu primera página web con las etiquetas esenciales.',
    level: 'Inicial', category: 'HTML',
    sections: [
      {
        title: '¿Qué es HTML y cómo funciona?',
        content: `HTML (HyperText Markup Language) es el lenguaje que da estructura a todas las páginas web. No es un lenguaje de programación — es un lenguaje de marcado. Esto significa que usamos etiquetas para describir el significado y la estructura del contenido.

Cuando escribes HTML, el navegador lo lee de arriba a abajo y lo convierte en una representación visual llamada DOM (Document Object Model). El DOM es el árbol de elementos que el navegador muestra en pantalla.

Cada documento HTML tiene una estructura básica obligatoria:`,
        code: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi primera página web</title>
  </head>
  <body>
    <h1>¡Hola, mundo!</h1>
    <p>Esta es mi primera página web.</p>
  </body>
</html>`,
      },
      {
        title: 'Etiquetas de texto y semántica',
        content: `Las etiquetas HTML tienen significado semántico, es decir, le dicen al navegador y a los motores de búsqueda qué tipo de contenido contienen. Usar las etiquetas correctas mejora la accesibilidad y el SEO.

Etiquetas de encabezado: <h1> al <h6> definen jerarquía de títulos. Solo debe haber un <h1> por página.

Etiquetas de texto: <p> para párrafos, <strong> para negrita semántica, <em> para cursiva semántica, <br> para salto de línea, <hr> para separador.`,
        code: `<h1>Título principal</h1>
<h2>Subtítulo</h2>
<h3>Sección más pequeña</h3>

<p>Un párrafo normal con <strong>texto importante</strong>
y texto <em>enfatizado</em>.</p>

<p>Primera línea.<br>Segunda línea en el mismo párrafo.</p>

<hr>

<p>Después del separador horizontal.</p>`,
      },
      {
        title: 'Listas, enlaces e imágenes',
        content: `Las listas son elementos clave para organizar información. HTML tiene dos tipos principales: listas ordenadas (<ol>) y no ordenadas (<ul>), ambas con elementos (<li>).

Los enlaces (<a>) son el corazón de la web — permiten navegar entre páginas. El atributo href indica el destino. Usa target="_blank" para abrir en nueva pestaña.

Las imágenes (<img>) son elementos vacíos (sin etiqueta de cierre). El atributo alt es obligatorio para accesibilidad: describe la imagen para lectores de pantalla y cuando la imagen no carga.`,
        code: `<!-- Lista no ordenada -->
<ul>
  <li>HTML — estructura</li>
  <li>CSS — estilos</li>
  <li>JavaScript — interactividad</li>
</ul>

<!-- Lista ordenada -->
<ol>
  <li>Aprender HTML</li>
  <li>Aprender CSS</li>
  <li>Construir proyectos</li>
</ol>

<!-- Enlace externo -->
<a href="https://developer.mozilla.org" target="_blank">
  MDN Web Docs
</a>

<!-- Imagen con texto alternativo -->
<img src="logo.png" alt="Logo de Codex" width="200">`,
      },
      {
        title: 'Estructura semántica de una página',
        content: `HTML5 introdujo etiquetas semánticas que describen las secciones de una página web. Usar estas etiquetas en lugar de <div> genéricos mejora enormemente la accesibilidad y el posicionamiento en buscadores.

Las principales etiquetas semánticas son:
• <header> — cabecera de la página o sección
• <nav> — menú de navegación
• <main> — contenido principal (solo uno por página)
• <section> — sección temática de contenido
• <article> — contenido independiente y reutilizable
• <aside> — contenido secundario o sidebar
• <footer> — pie de página`,
        code: `<header>
  <nav>
    <a href="/">Inicio</a>
    <a href="/sobre-mi">Sobre mí</a>
    <a href="/contacto">Contacto</a>
  </nav>
</header>

<main>
  <section>
    <h2>Últimos artículos</h2>
    <article>
      <h3>Aprendiendo HTML</h3>
      <p>HTML es la base de toda página web...</p>
    </article>
  </section>

  <aside>
    <h3>Categorías</h3>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2024 Codex. Todos los derechos reservados.</p>
</footer>`,
      },
    ],
    questions: [
      { question: '¿Qué significa la "M" en HTML?', options: ['Machine', 'Markup', 'Module', 'Method'], correct: 1 },
      { question: '¿Cuántos elementos <h1> debería haber en una página HTML bien estructurada?', options: ['Tantos como quieras', 'Solo uno', 'Dos como máximo', 'Ninguno, h1 está obsoleto'], correct: 1 },
      { question: '¿Qué atributo de <img> es obligatorio para la accesibilidad?', options: ['src', 'width', 'alt', 'title'], correct: 2 },
      { question: '¿Qué sección debe contener el contenido principal de una página?', options: ['<section>', '<div>', '<main>', '<body>'], correct: 2 },
      { question: '¿Qué etiqueta define un enlace en HTML?', options: ['<link>', '<href>', '<a>', '<url>'], correct: 2 },
      { question: '¿Dónde se escribe el título que aparece en la pestaña del navegador?', options: ['En el <h1> del body', 'En el atributo title del body', 'En la etiqueta <title> del head', 'En el meta charset'], correct: 2 },
      { question: '¿Cuál es la diferencia entre <strong> y <b>?', options: ['No hay diferencia', '<strong> tiene significado semántico (importancia), <b> es solo visual', '<b> es más moderno que <strong>', '<strong> solo funciona en Chrome'], correct: 1 },
      { question: '¿Qué hace el atributo target="_blank" en un enlace?', options: ['Abre el enlace en la misma pestaña', 'Abre el enlace en una nueva pestaña', 'Descarga el archivo enlazado', 'Abre el enlace en un iframe'], correct: 1 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Fundamentos de CSS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Fundamentos de CSS',
    description: 'Aprende a dar estilo a tus páginas web con CSS: selectores, propiedades, el modelo de caja y cómo cascada y herencia determinan los estilos finales.',
    level: 'Inicial', category: 'CSS',
    sections: [
      {
        title: '¿Qué es CSS y cómo se aplica?',
        content: `CSS (Cascading Style Sheets) es el lenguaje que controla la presentación visual de una página web. Se puede aplicar de tres formas:

1. CSS en línea (inline): directamente en el atributo style del elemento. Tiene la mayor especificidad pero es difícil de mantener.
2. CSS interno (internal): dentro de una etiqueta <style> en el <head>. Útil para páginas únicas.
3. CSS externo (external): en un archivo .css separado vinculado con <link>. Es la práctica recomendada porque separa estructura de presentación y permite reutilización.`,
        code: `<!-- 1. CSS en línea (evitar) -->
<p style="color: red; font-size: 18px;">Texto rojo</p>

<!-- 2. CSS interno -->
<head>
  <style>
    p { color: blue; }
  </style>
</head>

<!-- 3. CSS externo (recomendado) -->
<head>
  <link rel="stylesheet" href="estilos.css">
</head>

/* Dentro de estilos.css */
p {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
}`,
      },
      {
        title: 'Selectores CSS: básicos y combinadores',
        content: `Los selectores determinan a qué elementos HTML se aplican los estilos. Cuanto más específico sea un selector, mayor prioridad tendrá (especificidad).

Selectores básicos:
• De elemento: p, h1, div — selecciona todos los elementos de ese tipo
• De clase (.clase): reutilizable en varios elementos
• De ID (#id): único por página, máxima especificidad
• Universal (*): selecciona todos los elementos

Combinadores:
• Descendiente (A B): B dentro de A a cualquier profundidad
• Hijo directo (A > B): B directamente dentro de A
• Hermano adyacente (A + B): B inmediatamente después de A`,
        code: `/* Selector de elemento */
h1 { color: navy; }

/* Selector de clase */
.destacado { background: yellow; }

/* Selector de ID */
#cabecera { height: 80px; }

/* Selector universal */
* { box-sizing: border-box; }

/* Descendiente: cualquier <p> dentro de .articulo */
.articulo p { line-height: 1.8; }

/* Hijo directo: solo <li> hijos directos de <ul> */
ul > li { list-style: square; }

/* Hermano adyacente: <p> justo después de <h2> */
h2 + p { margin-top: 0; }

/* Selector de atributo */
a[href^="https"] { color: green; }`,
      },
      {
        title: 'El modelo de caja (Box Model)',
        content: `Todo elemento HTML es una caja rectangular. El Box Model define cuánto espacio ocupa esa caja y cómo se relaciona con los elementos vecinos. Tiene cuatro capas:

1. Content: el contenido real (texto, imagen, etc.)
2. Padding: espacio interior entre el contenido y el borde
3. Border: el borde visible del elemento
4. Margin: espacio exterior entre este elemento y los vecinos

Por defecto, width y height solo afectan al contenido. Con box-sizing: border-box, width incluye padding y border — esto es mucho más intuitivo y es la práctica moderna estándar.`,
        code: `/* El reset moderno — aplicar a todos los elementos */
*, *::before, *::after {
  box-sizing: border-box;
}

.tarjeta {
  /* Dimensiones del contenido */
  width: 300px;
  height: auto;

  /* Espacio interior */
  padding: 24px;

  /* Borde */
  border: 2px solid #e2e8f0;
  border-radius: 12px;

  /* Espacio exterior */
  margin: 16px;

  /* Padding individual */
  padding-top: 32px;
  padding-right: 24px;
  padding-bottom: 32px;
  padding-left: 24px;

  /* Shorthand: arriba | derecha | abajo | izquierda */
  padding: 32px 24px;
  /* Shorthand: arriba/abajo | derecha/izquierda */
}`,
      },
      {
        title: 'Colores, tipografía y unidades',
        content: `CSS ofrece múltiples formas de expresar valores:

Colores: nombre (red), hexadecimal (#ff0000), rgb(255, 0, 0), hsl(0, 100%, 50%) o con transparencia rgba/hsla.

Unidades de longitud:
• Absolutas: px (píxeles) — valor fijo
• Relativas: em (relativo al font-size del padre), rem (relativo al root), % (porcentaje del contenedor), vw/vh (% del viewport)

Tipografía: font-size, font-family, font-weight, line-height y letter-spacing son las propiedades más usadas.`,
        code: `/* Colores */
.elemento {
  color: #1e293b;              /* hexadecimal */
  background: rgb(248, 250, 252);
  border-color: hsl(220, 90%, 56%);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* Tipografía */
body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;       /* base */
  line-height: 1.6;      /* sin unidad = relativo al font-size */
  color: #1e293b;
}

h1 {
  font-size: 2.5rem;     /* 40px si el root es 16px */
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Variables CSS personalizadas */
:root {
  --color-primary: #6366f1;
  --spacing-md: 1rem;
}

.boton {
  background: var(--color-primary);
  padding: var(--spacing-md);
}`,
      },
    ],
    questions: [
      { question: '¿Qué significa CSS?', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Coded Style System'], correct: 1 },
      { question: '¿Cuál es la forma recomendada de aplicar CSS?', options: ['Atributo style en cada elemento', 'Etiqueta <style> en el body', 'Archivo externo enlazado con <link>', 'JavaScript'], correct: 2 },
      { question: '¿Qué capas forman el Box Model en orden de adentro hacia afuera?', options: ['margin → border → padding → content', 'content → padding → border → margin', 'padding → content → margin → border', 'border → content → padding → margin'], correct: 1 },
      { question: '¿Qué hace box-sizing: border-box?', options: ['Elimina el borde del elemento', 'Hace que width incluya padding y border', 'Aplica un borde automático', 'Solo funciona con Flexbox'], correct: 1 },
      { question: '¿Qué unidad es relativa al font-size del elemento raíz (<html>)?', options: ['em', 'px', 'rem', 'vw'], correct: 2 },
      { question: '¿Cuál selector tiene mayor especificidad?', options: ['p.clase', '#identificador', '.clase', 'p'], correct: 1 },
      { question: '¿Qué combinador selecciona un elemento solo si es hijo DIRECTO?', options: ['A B (espacio)', 'A + B', 'A > B', 'A ~ B'], correct: 2 },
      { question: '¿Cómo se declara una variable CSS personalizada?', options: ['$variable: valor', 'var: nombre = valor', '--nombre: valor dentro de :root', '@variable: valor'], correct: 2 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. Flexbox
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Flexbox: Layout Unidimensional',
    description: 'Domina Flexbox para crear layouts unidimensionales, centrar elementos de forma sencilla y distribuir espacio entre componentes de forma flexible y responsiva.',
    level: 'Intermedio', category: 'Layout',
    sections: [
      {
        title: 'Conceptos fundamentales de Flexbox',
        content: `Flexbox (Flexible Box Layout) es un modelo de layout CSS diseñado para distribuir espacio y alinear elementos en una dimensión — una fila o una columna.

Al aplicar display: flex a un elemento, este se convierte en el flex container y sus hijos directos en flex items.

Conceptos clave:
• Eje principal (main axis): la dirección en la que se colocan los flex items (horizontal por defecto)
• Eje cruzado (cross axis): perpendicular al eje principal
• flex-direction: define el eje principal (row, column, row-reverse, column-reverse)`,
        code: `.contenedor {
  display: flex;

  /* Eje principal: horizontal (defecto) */
  flex-direction: row;

  /* Eje principal: vertical */
  flex-direction: column;

  /* Los items se colocan de derecha a izquierda */
  flex-direction: row-reverse;
}

/* Ejemplo: navegación horizontal */
.nav {
  display: flex;
  flex-direction: row;  /* innecesario, es el defecto */
  background: #1e293b;
  padding: 0 2rem;
}

.nav a {
  padding: 1rem;
  color: white;
  text-decoration: none;
}`,
      },
      {
        title: 'Alineación en los dos ejes',
        content: `justify-content controla la alineación en el eje principal (horizontal si direction es row):
• flex-start: al inicio (defecto)
• flex-end: al final
• center: centrado
• space-between: espacio entre items, sin espacio en los extremos
• space-around: espacio igual alrededor de cada item
• space-evenly: espacio exactamente igual entre todos

align-items controla la alineación en el eje cruzado (vertical si direction es row):
• stretch: los items se estiran para llenar el contenedor (defecto)
• flex-start / flex-end: al inicio o final del eje cruzado
• center: centrado verticalmente
• baseline: alineado por la línea base del texto`,
        code: `/* Centrar perfectamente en los dos ejes */
.centrado {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  /* necesita altura definida */
}

/* Barra de navegación típica */
.navbar {
  display: flex;
  justify-content: space-between; /* logo a izquierda, links a derecha */
  align-items: center;
  padding: 0 2rem;
  height: 64px;
}

/* Cards en fila con espacio entre ellas */
.cards {
  display: flex;
  justify-content: space-between;
  align-items: stretch; /* todas la misma altura */
  gap: 1.5rem;
}`,
      },
      {
        title: 'Flex items: crecimiento, encogimiento y orden',
        content: `Las propiedades que se aplican a los flex items (no al contenedor) controlan cómo se comporta cada elemento individualmente:

• flex-grow: cuánto crece un item respecto a los demás cuando hay espacio sobrante (0 = no crece, 1 = crece proporcionalmente)
• flex-shrink: cuánto se encoge cuando no hay suficiente espacio (1 por defecto, 0 = nunca se encoge)
• flex-basis: el tamaño base antes de que flex-grow/shrink actúen
• flex: shorthand para flex-grow, flex-shrink y flex-basis
• order: cambia el orden visual sin cambiar el HTML (útil para responsive)
• align-self: sobreescribe align-items solo para ese item`,
        code: `/* Sidebar fijo + contenido flexible */
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  flex: 0 0 260px;   /* no crece, no encoge, 260px fijo */
  background: #1e293b;
}

.contenido {
  flex: 1;            /* flex: 1 1 0% — ocupa todo el espacio restante */
  padding: 2rem;
  overflow-y: auto;
}

/* Reordenar en móvil */
@media (max-width: 768px) {
  .layout { flex-direction: column; }

  .sidebar { order: 2; }   /* sidebar va abajo */
  .contenido { order: 1; } /* contenido va arriba */
}

/* align-self: el item se alinea diferente */
.item-especial {
  align-self: flex-end;
}`,
      },
      {
        title: 'flex-wrap y layout multi-línea',
        content: `Por defecto, Flexbox intenta poner todos los items en una sola línea, comprimiéndolos si es necesario. Con flex-wrap: wrap, los items que no caben saltan a la siguiente línea.

align-content funciona igual que justify-content pero alinea las líneas entre sí (solo tiene efecto cuando hay más de una línea, es decir, cuando hay wrap).

El atributo gap (antes llamado grid-gap) añade espacio entre items sin necesidad de márgenes. Es la forma moderna de separar elementos en Flexbox y Grid.`,
        code: `/* Grid de tarjetas responsivo */
.galeria {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 2rem;
}

.tarjeta {
  /* Cada tarjeta ocupa al menos 250px,
     pero crece para aprovechar el espacio */
  flex: 1 1 250px;
  max-width: 350px;

  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Cuando hay múltiples líneas */
.multi-linea {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between; /* distribuye las filas */
  height: 400px;
}`,
      },
    ],
    questions: [
      { question: '¿Qué propiedad convierte un elemento en flex container?', options: ['flex: container', 'display: flex', 'flexbox: true', 'layout: flex'], correct: 1 },
      { question: '¿Qué propiedad alinea los items en el eje PRINCIPAL?', options: ['align-items', 'align-content', 'justify-content', 'justify-items'], correct: 2 },
      { question: '¿Qué valor de justify-content deja espacio entre items pero NO en los extremos?', options: ['space-around', 'space-evenly', 'space-between', 'justify'], correct: 2 },
      { question: '¿Qué hace flex: 1 aplicado a un item?', options: ['Fija el item a 1px de ancho', 'El item ocupa todo el espacio disponible restante', 'El item no crece ni encoge', 'El item se queda en la primera posición'], correct: 1 },
      { question: '¿Qué propiedad permite que los flex items pasen a la siguiente línea?', options: ['flex-direction: wrap', 'flex-wrap: wrap', 'align-wrap: true', 'overflow: wrap'], correct: 1 },
      { question: '¿Qué propiedad alinea un ÚNICO item de forma diferente al resto?', options: ['justify-self', 'self-align', 'align-self', 'flex-align'], correct: 2 },
      { question: '¿Cuándo tiene efecto align-content?', options: ['Siempre', 'Solo cuando hay un item', 'Solo cuando hay más de una línea (con flex-wrap)', 'Solo en flex-direction: column'], correct: 2 },
      { question: '¿Qué propiedad añade espacio entre flex items sin usar márgenes?', options: ['spacing', 'gutter', 'gap', 'margin-between'], correct: 2 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. CSS Grid
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'CSS Grid: Layout Bidimensional',
    description: 'Aprende CSS Grid para crear layouts complejos de dos dimensiones — filas y columnas — con control total sobre el posicionamiento de cada elemento.',
    level: 'Intermedio', category: 'Grid',
    sections: [
      {
        title: 'Fundamentos de CSS Grid',
        content: `CSS Grid es el primer sistema de layout CSS diseñado específicamente para dos dimensiones: filas y columnas a la vez.

Terminología:
• Grid container: el elemento con display: grid
• Grid items: los hijos directos del container
• Grid lines: las líneas que dividen el grid (numeradas desde 1)
• Grid tracks: las filas y columnas entre líneas
• Grid cell: la intersección de una fila y una columna
• Grid area: un rectángulo de una o más celdas

grid-template-columns y grid-template-rows definen el número y tamaño de las columnas y filas respectivamente.`,
        code: `/* Grid de 3 columnas iguales */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* Equivalente con repeat() */
  grid-template-columns: repeat(3, 1fr);

  /* Columnas de tamaño diferente */
  grid-template-columns: 200px 1fr 2fr;
}

/* Grid con filas y columnas */
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr 48px;
  height: 100vh;
  gap: 0;
}`,
      },
      {
        title: 'La unidad fr y funciones CSS Grid',
        content: `La unidad fr (fracción) es exclusiva de CSS Grid y representa una fracción del espacio disponible en el grid.

Funciones útiles:
• repeat(n, valor): repite un valor n veces
• minmax(min, max): define un rango mínimo y máximo para un track
• auto-fill: crea tantas columnas como quepan
• auto-fit: igual que auto-fill pero colapsa las columnas vacías

La combinación de auto-fill/auto-fit con minmax crea layouts responsivos sin media queries.`,
        code: `/* Layout responsivo sin media queries */
.galeria {
  display: grid;
  /* Como mínimo 250px, como máximo 1fr */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* auto-fit vs auto-fill:
   auto-fit: las columnas vacías se colapsan (los items se estiran)
   auto-fill: las columnas vacías mantienen su espacio */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

/* Filas con altura mínima */
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, minmax(120px, auto));
  gap: 1rem;
}`,
      },
      {
        title: 'Posicionamiento de items con grid-column y grid-row',
        content: `Cada grid item puede colocarse en posiciones específicas del grid usando las propiedades grid-column y grid-row, que indican entre qué líneas del grid ocupa el elemento.

La sintaxis es grid-column: línea-inicio / línea-fin. Con span podemos indicar cuántas columnas/filas ocupa en lugar de las líneas específicas.

Esta capacidad de control bidimensional es lo que hace a Grid único — podemos construir layouts complejos tipo revista o dashboard sin hacks.`,
        code: `/* Layout de página completa */
.pagina {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

/* Header: ocupa las 3 columnas */
.header {
  grid-column: 1 / 4;       /* desde línea 1 hasta línea 4 */
  /* Equivalente: */
  grid-column: 1 / -1;      /* -1 = última línea */
  /* O también: */
  grid-column: span 3;
}

/* Footer: ocupa todo el ancho */
.footer {
  grid-column: 1 / -1;
  grid-row: 3 / 4;
}

/* Item grande en el dashboard */
.widget-principal {
  grid-column: span 2;  /* ocupa 2 columnas */
  grid-row: span 2;     /* ocupa 2 filas */
}`,
      },
      {
        title: 'grid-template-areas: layout visual',
        content: `grid-template-areas permite definir el layout de forma visual, asignando nombres a las áreas y luego colocando los items con grid-area. Es muy legible y fácil de modificar.

Las reglas son:
• Cada fila es una cadena de texto con nombres separados por espacio
• Los nombres iguales forman un área rectangular
• Un punto (.) indica una celda vacía
• Todas las filas deben tener el mismo número de columnas`,
        code: `/* Layout clásico con named areas */
.layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 64px 1fr 48px;
  grid-template-areas:
    "header  header"
    "sidebar main  "
    "footer  footer";
  height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Responsive: apilar en móvil */
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}`,
      },
    ],
    questions: [
      { question: '¿Qué hace display: grid?', options: ['Centra el elemento automáticamente', 'Convierte el elemento en grid container', 'Aplica un grid visual de debug', 'Activa Flexbox bidimensional'], correct: 1 },
      { question: '¿Qué significa la unidad fr?', options: ['Fracción del espacio disponible en el grid', 'Font-relative units', 'Free space en píxeles', 'Frame ratio'], correct: 0 },
      { question: '¿Qué función CSS Grid permite crear columnas responsivas sin media queries?', options: ['repeat(auto, 1fr)', 'auto-columns: 1fr', 'repeat(auto-fill, minmax(250px, 1fr))', 'fluid-columns: true'], correct: 2 },
      { question: '¿Qué hace grid-column: 1 / -1?', options: ['Coloca el item en la primera columna', 'El item ocupa desde la primera hasta la última línea (todo el ancho)', 'Invierte el orden del item', 'El item flota a la derecha'], correct: 1 },
      { question: '¿Qué propiedad se usa para dar nombre a un área del grid y colocar un item en ella?', options: ['grid-name', 'grid-position', 'grid-area', 'area-template'], correct: 2 },
      { question: '¿Cuál es la diferencia principal entre Flexbox y Grid?', options: ['Flexbox es más moderno', 'Flexbox es unidimensional, Grid es bidimensional', 'Grid no es compatible con Firefox', 'Son exactamente iguales'], correct: 1 },
      { question: '¿Qué hace span en grid-column: span 3?', options: ['El item empieza en la columna 3', 'El item ocupa 3 columnas', 'El item flota sobre 3 columnas', 'El item se oculta en las 3 primeras columnas'], correct: 1 },
      { question: '¿Qué representa un punto (.) en grid-template-areas?', options: ['Una celda sin nombre', 'Un error de sintaxis', 'Una celda vacía', 'Un separador de filas'], correct: 2 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. Selectores y Especificidad CSS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Selectores y Especificidad CSS',
    description: 'Aprende a seleccionar elementos con precisión usando pseudoclases, pseudoelementos y atributos, y entiende cómo funciona la cascada y la especificidad para evitar conflictos.',
    level: 'Inicial', category: 'CSS',
    sections: [
      {
        title: 'Pseudoclases: estilos según el estado',
        content: `Las pseudoclases seleccionan elementos según su estado o posición en el DOM. Se escriben con dos puntos (:) después del selector.

Pseudoclases de estado de usuario:
• :hover — cuando el cursor está encima
• :focus — cuando el elemento tiene el foco (teclado)
• :active — mientras el usuario hace clic
• :visited — enlace ya visitado

Pseudoclases estructurales:
• :first-child / :last-child — primer o último hijo
• :nth-child(n) — el enésimo hijo (acepta fórmulas como 2n+1)
• :not(selector) — todos los que NO coincidan
• :empty — sin contenido`,
        code: `/* Estados de interacción */
button {
  background: #6366f1;
  transition: all 0.2s;
}
button:hover  { background: #4f46e5; transform: translateY(-1px); }
button:active { transform: translateY(0); }
button:focus  { outline: 3px solid rgba(99, 102, 241, 0.5); }

/* Selección estructural */
li:first-child { border-top: none; }
li:last-child  { border-bottom: none; }

/* Filas alternadas de tabla */
tr:nth-child(even) { background: #f8fafc; }
tr:nth-child(odd)  { background: white; }

/* Todos los input excepto los de tipo submit */
input:not([type="submit"]) {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

/* :nth-child con fórmula: 3er item y cada 3 después */
li:nth-child(3n) { color: #6366f1; }`,
      },
      {
        title: 'Pseudoelementos: contenido generado',
        content: `Los pseudoelementos crean "partes virtuales" de un elemento o insertan contenido generado por CSS. Se escriben con doble dos puntos (::).

Los más utilizados:
• ::before — inserta contenido antes del contenido real
• ::after — inserta contenido después del contenido real
• ::first-line — primera línea de un texto
• ::first-letter — primera letra (útil para capitulares)
• ::placeholder — texto de placeholder en inputs
• ::selection — texto seleccionado por el usuario

::before y ::after requieren la propiedad content (puede ser una cadena vacía '').`,
        code: `/* Icono decorativo con ::before */
.lista-check li::before {
  content: '✓ ';
  color: #22c55e;
  font-weight: bold;
}

/* Línea decorativa bajo el título */
h2 {
  position: relative;
  padding-bottom: 0.5rem;
}
h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: #6366f1;
  border-radius: 2px;
}

/* Capitalizar primera letra */
p::first-letter {
  font-size: 2em;
  float: left;
  line-height: 1;
  margin-right: 4px;
  color: #6366f1;
}

/* Personalizar placeholder */
input::placeholder { color: #94a3b8; font-style: italic; }

/* Color de selección */
::selection { background: #6366f1; color: white; }`,
      },
      {
        title: 'Selectores de atributo avanzados',
        content: `Los selectores de atributo permiten seleccionar elementos basándose en sus atributos y valores. Son especialmente útiles cuando no puedes o no quieres añadir clases al HTML.

Variantes:
• [attr] — tiene el atributo (sin importar el valor)
• [attr="val"] — valor exacto
• [attr^="val"] — valor que EMPIEZA por "val"
• [attr$="val"] — valor que TERMINA por "val"
• [attr*="val"] — valor que CONTIENE "val"
• [attr~="val"] — valor en lista de palabras separadas por espacio
• [attr|="val"] — valor exacto o empieza por "val-" (útil para lang)`,
        code: `/* Todos los enlaces externos */
a[href^="http"] {
  padding-right: 1.2em;
}
a[href^="http"]::after {
  content: ' ↗';
  font-size: 0.8em;
  opacity: 0.6;
}

/* Enlace a PDF */
a[href$=".pdf"]::before {
  content: '📄 ';
}

/* Inputs con validación */
input[type="email"]:valid   { border-color: #22c55e; }
input[type="email"]:invalid { border-color: #ef4444; }

/* Elementos deshabilitados */
[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Imágenes con alt vacío (accesibilidad) */
img[alt=""] {
  border: 2px dashed red; /* marca imágenes sin descripción */
}`,
      },
      {
        title: 'La cascada y la especificidad',
        content: `Cuando varios selectores apuntan al mismo elemento, CSS usa la especificidad para decidir cuál gana. La especificidad se calcula como tres números (A, B, C):

• A: número de IDs en el selector
• B: número de clases, pseudoclases y atributos
• C: número de elementos y pseudoelementos

El selector con mayor especificidad (comparando A, B, C de izquierda a derecha) gana.

!important sobreescribe todo pero debe evitarse — indica un problema de arquitectura CSS.

El orden de la cascada cuando la especificidad es igual: gana la regla que aparece más tarde en el CSS.`,
        code: `/*
Cálculo de especificidad (A, B, C):

p              → 0,0,1  (1 elemento)
.clase         → 0,1,0  (1 clase)
#id            → 1,0,0  (1 ID)
p.clase        → 0,1,1  (1 clase + 1 elemento)
#id .clase p   → 1,1,1  (1 ID + 1 clase + 1 elemento)
*/

/* ← Pierde (0,0,1) */
p { color: black; }

/* ← Gana sobre el anterior (0,1,0) */
.destacado { color: blue; }

/* ← Gana sobre ambos (1,0,0) */
#especial { color: red; }

/* Evitar esto: */
p { color: green !important; }

/* Mejor práctica: usar clases con nombres específicos */
.card-title--primary { color: #6366f1; }
.card-title--danger  { color: #ef4444; }`,
      },
    ],
    questions: [
      { question: '¿Qué pseudoclase selecciona un elemento cuando el cursor está encima?', options: [':active', ':focus', ':hover', ':over'], correct: 2 },
      { question: '¿Cuántos dos puntos usan los pseudoelementos en CSS moderno?', options: ['Ninguno', 'Uno (:)', 'Dos (::)', 'Tres (:::)'], correct: 2 },
      { question: '¿Qué propiedad es OBLIGATORIA en ::before y ::after para que aparezcan?', options: ['display', 'content', 'position', 'visibility'], correct: 1 },
      { question: '¿Qué selector de atributo selecciona href que EMPIEZA por "https"?', options: ['a[href*="https"]', 'a[href$="https"]', 'a[href^="https"]', 'a[href="https"]'], correct: 2 },
      { question: '¿Cuál tiene mayor especificidad?', options: ['.clase p', '#id', 'div.clase', 'p:hover'], correct: 1 },
      { question: '¿Qué hace :nth-child(2n+1)?', options: ['Selecciona el 3er hijo', 'Selecciona los hijos impares (1, 3, 5...)', 'Selecciona los hijos pares', 'No es CSS válido'], correct: 1 },
      { question: '¿Qué pseudoclase selecciona elementos que NO coinciden con un selector?', options: [':exclude()', ':not()', ':without()', ':ignore()'], correct: 1 },
      { question: '¿Cuándo gana una regla CSS si dos tienen la misma especificidad?', options: ['La que aparece primero en el código', 'La que tiene más propiedades', 'La que aparece más tarde en el código', 'La que usa más selectores'], correct: 2 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. Formularios en HTML y CSS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Formularios en HTML y CSS',
    description: 'Crea formularios accesibles y usables con los elementos HTML correctos, valida datos en el cliente y dales estilos profesionales con CSS.',
    level: 'Inicial', category: 'HTML',
    sections: [
      {
        title: 'Elementos de formulario esenciales',
        content: `Los formularios HTML permiten recoger datos del usuario para enviarlos a un servidor. La etiqueta <form> es el contenedor principal.

Atributos de <form>:
• action: URL donde se envían los datos
• method: GET (datos en la URL) o POST (datos en el cuerpo)

Elementos de entrada:
• <input>: el más versátil, con muchos tipos diferentes
• <textarea>: área de texto multilínea
• <select> + <option>: lista desplegable
• <button>: botón (type="submit", "reset" o "button")

El elemento <label> vincula un texto descriptivo con un input. Es clave para la accesibilidad: usa el atributo for con el id del input correspondiente.`,
        code: `<form action="/contacto" method="POST">

  <!-- Label vinculado al input por el id -->
  <label for="nombre">Nombre completo</label>
  <input type="text" id="nombre" name="nombre"
         placeholder="Tu nombre" required>

  <label for="email">Correo electrónico</label>
  <input type="email" id="email" name="email"
         placeholder="tu@email.com" required>

  <!-- Textarea para mensajes largos -->
  <label for="mensaje">Mensaje</label>
  <textarea id="mensaje" name="mensaje"
            rows="5" placeholder="Escribe tu mensaje..."></textarea>

  <!-- Select desplegable -->
  <label for="tema">Tema</label>
  <select id="tema" name="tema">
    <option value="">-- Selecciona --</option>
    <option value="soporte">Soporte técnico</option>
    <option value="ventas">Ventas</option>
    <option value="otro">Otro</option>
  </select>

  <button type="submit">Enviar mensaje</button>
</form>`,
      },
      {
        title: 'Tipos de input y sus atributos',
        content: `HTML5 añadió muchos tipos de input que mejoran la experiencia en móvil (muestran el teclado apropiado) y añaden validación nativa del navegador.

Tipos más importantes:
• text, email, password, number, tel, url — texto con validación
• date, time, datetime-local — selector de fecha/hora
• checkbox — casilla de verificación (múltiple selección)
• radio — opción única entre varias
• range — deslizador numérico
• file — selector de archivos
• color — selector de color
• hidden — campo invisible (para enviar datos extra)

Atributos de validación: required, min, max, minlength, maxlength, pattern (regex)`,
        code: `<!-- Número con rango -->
<input type="number" min="0" max="100" step="5">

<!-- Fecha -->
<input type="date" min="2024-01-01">

<!-- Teléfono (activa teclado numérico en móvil) -->
<input type="tel" pattern="[0-9]{9}">

<!-- Contraseña con requisitos -->
<input type="password" minlength="8" required>

<!-- Radio buttons (solo uno seleccionable) -->
<fieldset>
  <legend>Nivel de experiencia</legend>
  <label>
    <input type="radio" name="nivel" value="junior"> Junior
  </label>
  <label>
    <input type="radio" name="nivel" value="senior"> Senior
  </label>
</fieldset>

<!-- Checkboxes (múltiple selección) -->
<label>
  <input type="checkbox" name="terminos" required>
  Acepto los términos y condiciones
</label>

<!-- Subida de imagen -->
<input type="file" accept="image/*" multiple>`,
      },
      {
        title: 'Validación nativa y con CSS',
        content: `El navegador puede validar los datos automáticamente usando atributos HTML antes de enviar el formulario. La pseudoclase :valid/:invalid cambia según el estado de validación.

Atributos de validación:
• required: el campo no puede estar vacío
• pattern: debe coincidir con una expresión regular
• min / max: valores mínimo y máximo (para number, date)
• minlength / maxlength: longitud mínima y máxima del texto

Con :focus-within podemos detectar cuándo cualquier hijo del formulario tiene el foco, muy útil para efectos visuales.`,
        code: `/* Estilos de validación */
input {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  outline: none;
}

/* Estado con foco */
input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

/* Solo muestra validación si el usuario ya interactuó */
input:not(:placeholder-shown):valid {
  border-color: #22c55e;
}

input:not(:placeholder-shown):invalid {
  border-color: #ef4444;
}

/* Mensaje de error con ::after */
.campo {
  position: relative;
}

.campo input:invalid + .mensaje-error {
  display: block;
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.mensaje-error { display: none; }`,
      },
      {
        title: 'Dar estilos profesionales a un formulario',
        content: `Los formularios por defecto tienen un aspecto anticuado. Con CSS podemos crear formularios modernos y consistentes.

Técnicas clave:
• Eliminar el aspecto nativo de los inputs con appearance: none
• Usar variables CSS para consistencia
• Crear el efecto de "label flotante" (floating label) con :placeholder-shown y ~ (hermano)
• Agrupar campos con <fieldset> bien estilado
• Botones con estados hover, active y focus visibles`,
        code: `/* Sistema de diseño del formulario */
:root {
  --input-border: #e2e8f0;
  --input-focus: #6366f1;
  --input-radius: 8px;
  --input-padding: 0.75rem 1rem;
}

/* Reset de selects */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

/* Label flotante */
.campo {
  position: relative;
  margin-bottom: 1.5rem;
}

.campo input { padding-top: 1.25rem; }

.campo label {
  position: absolute;
  top: 50%; left: 1rem;
  transform: translateY(-50%);
  transition: all 0.2s;
  color: #94a3b8;
  pointer-events: none;
}

.campo input:focus ~ label,
.campo input:not(:placeholder-shown) ~ label {
  top: 0.35rem;
  font-size: 0.75rem;
  color: var(--input-focus);
}`,
      },
    ],
    questions: [
      { question: '¿Qué método de <form> envía los datos en la URL?', options: ['POST', 'PUT', 'GET', 'SEND'], correct: 2 },
      { question: '¿Para qué sirve el atributo for en un <label>?', options: ['Indica cuántos caracteres permite el input', 'Vincula el label con un input por su id', 'Define el formato del dato', 'Especifica el validador'], correct: 1 },
      { question: '¿Qué tipo de input activa el teclado numérico en móvil para teléfonos?', options: ['type="number"', 'type="phone"', 'type="tel"', 'type="mobile"'], correct: 2 },
      { question: '¿Qué atributo hace que un input sea obligatorio?', options: ['mandatory', 'obligatory', 'needed', 'required'], correct: 3 },
      { question: '¿Qué elemento HTML agrupa radio buttons o checkboxes relacionados?', options: ['<group>', '<fieldset>', '<section>', '<div class="grupo">'], correct: 1 },
      { question: '¿Qué pseudoclase selecciona un input cuando su valor cumple las restricciones de validación?', options: [':correct', ':valid', ':ok', ':success'], correct: 1 },
      { question: '¿Qué atributo de input define un patrón de expresión regular para validar?', options: ['regex', 'validate', 'pattern', 'format'], correct: 2 },
      { question: '¿Qué tipo de input permite seleccionar múltiples opciones de una lista?', options: ['type="multi"', 'type="checkbox"', 'Un <select> con el atributo multiple', 'type="multiselect"'], correct: 2 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. Animaciones y Transiciones CSS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Animaciones y Transiciones CSS',
    description: 'Crea interfaces más expresivas con transiciones suaves y animaciones CSS. Aprende @keyframes, timing functions y buenas prácticas de rendimiento.',
    level: 'Avanzado', category: 'CSS',
    sections: [
      {
        title: 'Transiciones CSS: cambios suaves',
        content: `Las transiciones (transition) permiten que una propiedad CSS cambie de valor gradualmente en lugar de hacerlo de forma instantánea. Son perfectas para efectos de hover, focus y toggle de clases.

La propiedad transition acepta:
• property: la propiedad a animar (o all para todas)
• duration: tiempo en segundos o milisegundos
• timing-function: la curva de velocidad
• delay: tiempo de espera antes de empezar

Timing functions más usadas:
• ease (defecto): empieza lento, accelera, termina lento
• linear: velocidad constante
• ease-in: empieza lento y acelera
• ease-out: empieza rápido y desacelera (la más natural para animaciones de salida)
• ease-in-out: lento al inicio y al final
• cubic-bezier(x1,y1,x2,y2): curva personalizada`,
        code: `/* Transición básica en hover */
.boton {
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  /* Animar múltiples propiedades */
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.boton:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
}

.boton:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Transición en tarjeta */
.tarjeta {
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}
.tarjeta:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}`,
      },
      {
        title: '@keyframes: animaciones completas',
        content: `Mientras que las transiciones solo animan entre dos estados (inicio → fin), las animaciones con @keyframes pueden definir cualquier número de estados intermedios.

La propiedad animation aplica la animación a un elemento:
• animation-name: nombre del @keyframes
• animation-duration: duración total
• animation-timing-function: curva de velocidad
• animation-delay: retardo inicial
• animation-iteration-count: repeticiones (infinite para bucle)
• animation-direction: normal, reverse, alternate, alternate-reverse
• animation-fill-mode: qué estado mantiene antes (backwards) y después (forwards, both) de la animación`,
        code: `/* Animación de entrada */
@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulso (badge de notificación) */
@keyframes pulso {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.15); opacity: 0.8; }
}

/* Spinner de carga */
@keyframes girar {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Aplicar animaciones */
.card {
  animation: aparecer 0.4s ease-out forwards;
}

/* Delay escalonado para listas */
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 100ms; }
.card:nth-child(3) { animation-delay: 200ms; }

.badge {
  animation: pulso 2s ease-in-out infinite;
}

.spinner {
  width: 32px; height: 32px;
  border: 3px solid rgba(99, 102, 241, 0.2);
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}`,
      },
      {
        title: 'La propiedad transform',
        content: `transform aplica transformaciones 2D y 3D a los elementos sin afectar al flujo del documento (no mueve otros elementos). Es mucho más eficiente que animar propiedades como left, top o margin.

Funciones de transform:
• translate(x, y): desplaza el elemento
• scale(x, y): escala el elemento
• rotate(ángulo): rota el elemento
• skew(x, y): inclina el elemento

Para animaciones 3D:
• perspective(n): define la perspectiva
• rotateX(ángulo) / rotateY(ángulo): rotación en 3D
• translateZ(n): acerca o aleja en el eje Z

Se pueden combinar múltiples transforms en una sola declaración.`,
        code: `/* Carta con efecto flip 3D */
.flip-container {
  perspective: 1000px;
  width: 200px;
  height: 280px;
}

.tarjeta {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.flip-container:hover .tarjeta {
  transform: rotateY(180deg);
}

.cara-frente,
.cara-reverso {
  position: absolute;
  width: 100%; height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
}

.cara-reverso {
  transform: rotateY(180deg);
  background: #6366f1;
  color: white;
}

/* Combinación de transforms */
.icono:hover {
  transform: rotate(15deg) scale(1.2) translateY(-4px);
}`,
      },
      {
        title: 'Rendimiento y buenas prácticas',
        content: `No todas las propiedades CSS se animan de igual forma. Algunas causan que el navegador recalcule el layout completo (reflow), lo que es costoso en CPU.

Propiedades que causan reflow (evitar en animaciones):
• width, height, margin, padding, top, left...

Propiedades optimizadas (solo composite layer, sin reflow):
• transform (translate, scale, rotate)
• opacity

El truco: usa transform: translate() en lugar de left/top, y opacity en lugar de visibility/display para mostrar/ocultar.

will-change avisa al navegador de que un elemento va a animarse para que lo prepare con antelación. Usar con moderación.

prefers-reduced-motion detecta si el usuario ha pedido reducir las animaciones del sistema.`,
        code: `/* MAL: causa reflow en cada frame */
@keyframes mal {
  from { left: 0; top: 0; }
  to   { left: 100px; top: 50px; }
}

/* BIEN: solo composite, sin reflow */
@keyframes bien {
  from { transform: translate(0, 0); }
  to   { transform: translate(100px, 50px); }
}

/* will-change (solo si de verdad lo necesitas) */
.elemento-que-anima {
  will-change: transform;
}

/* Respetar las preferencias de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Fade in/out accesible */
.modal {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.modal.visible {
  opacity: 1;
  pointer-events: auto;
}`,
      },
    ],
    questions: [
      { question: '¿Cuál es la diferencia entre transition y animation en CSS?', options: ['No hay diferencia, son sinónimos', 'transition necesita un cambio de estado (como hover), animation funciona sola con @keyframes', 'animation es más antigua y deprecated', 'transition solo funciona con opacidad'], correct: 1 },
      { question: '¿Qué timing-function hace que la animación empiece lenta y termine rápido?', options: ['ease-out', 'ease-in', 'linear', 'ease-in-out'], correct: 1 },
      { question: '¿Qué propiedad CSS NO causa reflow y es segura para animar con buen rendimiento?', options: ['width', 'margin', 'transform', 'height'], correct: 2 },
      { question: '¿Qué valor de animation-iteration-count hace que una animación se repita indefinidamente?', options: ['always', 'loop', 'infinite', '-1'], correct: 2 },
      { question: '¿Qué hace animation-fill-mode: forwards?', options: ['La animación va hacia adelante', 'El elemento mantiene el estilo del último keyframe al terminar', 'La animación empieza desde el principio', 'La animación se reproduce en reversa al terminar'], correct: 1 },
      { question: '¿Qué media query respeta la preferencia del usuario de reducir movimiento?', options: ['@media (no-animation: true)', '@media (prefers-reduced-motion: reduce)', '@media (accessibility: motion)', '@media (animation: none)'], correct: 1 },
      { question: '¿Qué hace la función CSS perspective()?', options: ['Hace el elemento transparente', 'Define la profundidad de la perspectiva 3D para los hijos', 'Escala el elemento en los tres ejes', 'Aplica desenfoque de perspectiva'], correct: 1 },
      { question: '¿Cuál es el propósito de will-change: transform?', options: ['Deshabilitar las transformaciones', 'Avisar al navegador para que optimice el elemento antes de que se anime', 'Hacer que transform sea obligatorio', 'Animar transform automáticamente'], correct: 1 },
    ],
  },
];

async function seed() {
  await mongoose.connect(MONGO_URL);
  console.log('Conectado a MongoDB');

  await User.deleteMany({});
  await Lesson.deleteMany({});
  console.log('Colecciones limpiadas');

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await User.create({ ...u, password: hashed });
  }
  console.log(`${users.length} usuarios creados`);

  await Lesson.insertMany(lessons);
  console.log(`${lessons.length} lecciones creadas`);

  await mongoose.disconnect();
  console.log('Seed completado');
}

seed().catch(err => { console.error(err); process.exit(1); });
