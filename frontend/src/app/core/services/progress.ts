import { Injectable, signal, computed } from '@angular/core';

export interface CompletedLesson {
  id: number;
  title: string;
  category: string;
  icon: string;
  completedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private _completedLessons = signal<CompletedLesson[]>(
    JSON.parse(localStorage.getItem('completedLessons') || '[]')
  );

  completedLessons = this._completedLessons.asReadonly();

  totalLessons = 7;

  progressPercent = computed(() =>
    Math.round((this._completedLessons().length / this.totalLessons) * 100)
  );

  isCompleted(id: number): boolean {
    return this._completedLessons().some(l => l.id === id);
  }

  completeLesson(lesson: CompletedLesson) {
    if (this.isCompleted(lesson.id)) return;
    const updated = [...this._completedLessons(), lesson];
    this._completedLessons.set(updated);
    localStorage.setItem('completedLessons', JSON.stringify(updated));
  }
}