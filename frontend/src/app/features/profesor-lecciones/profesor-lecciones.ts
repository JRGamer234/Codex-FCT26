import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  lessons = this.lessonService.lessons;
  loading = true;
  deletingId: string | null = null;

  ngOnInit() {
    this.lessonService.getLessons().subscribe({
      next: () => { this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.loading = false; this.cdr.detectChanges(); },
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
