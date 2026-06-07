import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-profesor-lecciones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profesor-lecciones.html',
  styleUrl: './profesor-lecciones.scss'
})
export class ProfesorLeccionesComponent implements OnInit {
  private lessonService = inject(LessonService);

  lessons = this.lessonService.lessons;
  loading = true;
  deletingId: string | null = null;

  ngOnInit() {
    this.lessonService.getLessons().subscribe({
      next: () => this.loading = false,
      error: () => this.loading = false,
    });
  }

  eliminar(id: string | undefined, e: Event) {
    e.stopPropagation();
    if (!id || !confirm('¿Eliminar esta lección? Esta acción no se puede deshacer.')) return;
    this.deletingId = id;
    this.lessonService.deleteLessonFromServer(id).subscribe({
      next: () => { this.lessonService.getLessons().subscribe(); this.deletingId = null; },
      error: () => this.deletingId = null,
    });
  }
}
