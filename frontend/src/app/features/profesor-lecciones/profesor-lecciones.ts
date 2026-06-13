import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';
import { Lesson } from '../../core/models/lesson.model';

@Component({
  selector: 'app-profesor-lecciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profesor-lecciones.html',
  styleUrl: './profesor-lecciones.scss'
})
export class ProfesorLeccionesComponent implements OnInit {
  private lessonService = inject(LessonService);
  private cdr = inject(ChangeDetectorRef);

  lessons = this.lessonService.lessons;
  loading = true;
  deletingId: string | null = null;

  searchQuery = '';
  filterCategory = '';
  filterLevel = '';

  get filteredLessons(): Lesson[] {
    const q = this.searchQuery.toLowerCase().trim();
    return this.lessons().filter(l => {
      const matchText = !q || l.title.toLowerCase().includes(q) || l.description?.toLowerCase().includes(q);
      const matchCat  = !this.filterCategory || l.category === this.filterCategory;
      const matchLvl  = !this.filterLevel || l.level === this.filterLevel;
      return matchText && matchCat && matchLvl;
    });
  }

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
