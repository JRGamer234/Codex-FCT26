import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service'; // Asegura esta ruta

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent implements OnInit {
  // Inyectamos el nuevo servicio
  private lessonService = inject(LessonService);

  // searchTerm sigue siendo un signal para el input
  searchTerm = signal('');

  // filteredLessons ahora mira directamente al signal del servicio
  filteredLessons = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allLessons = this.lessonService.lessons(); // <--- Datos de la DB

    return allLessons.filter(l =>
      l.title.toLowerCase().includes(term) ||
      l.level.toLowerCase().includes(term)
    );
  });

  ngOnInit() {
    // Llamamos al backend nada más cargar la página
    this.lessonService.getLessons().subscribe({
      next: (res) => console.log('Lecciones cargadas:', res),
      error: (err) => console.error('Error al conectar con el backend de Alejandro:', err)
    });
  }

  updateSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}