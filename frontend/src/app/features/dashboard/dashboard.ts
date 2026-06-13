import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../core/services/progress';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  progressService = inject(ProgressService);
  private lessonService = inject(LessonService);

  searchText = signal('');
  selectedLevel = signal('');
  selectedCategory = signal('');

  filteredLessons = computed(() => {
    const search = this.searchText().toLowerCase();
    const level = this.selectedLevel();
    const category = this.selectedCategory();
    return this.lessonService.lessons().filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(search);
      const matchesLevel = level ? lesson.level?.toLowerCase() === level : true;
      const matchesCategory = category ? lesson.category === category : true;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  });

  categoryStats = computed(() => {
    const lessons = this.lessonService.lessons();
    const completed = this.progressService.completedLessons();
    const completedIds = new Set(completed.map(c => c.lessonId));
    const cats = [...new Set(lessons.map(l => l.category).filter(Boolean))].sort();
    return cats.map(cat => {
      const total = lessons.filter(l => l.category === cat).length;
      const done  = lessons.filter(l => l.category === cat && completedIds.has(l._id ?? '')).length;
      return { name: cat, total, done, pct: total ? Math.round((done / total) * 100) : 0 };
    });
  });

  ngOnInit() {
    this.progressService.loadProgress().subscribe();
    this.lessonService.getLessons().subscribe();
  }

  get completedLessons() { return this.progressService.completedLessons(); }
}
