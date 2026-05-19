import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { UiService } from '../../services/ui.service';
import { NavBarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent implements OnInit {
  // Inyectamos los servicios
  private lessonService = inject(LessonService);
  public uiService = inject(UiService);

  // filteredLessons ahora mira directamente al signal del UiService
  filteredLessons = computed(() => {
    const term = this.uiService.searchTerm().toLowerCase();
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
}