import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface CompletedLesson {
  lessonId: string;
  lessonTitle: string;
  lessonCategory: string;
  completedAt: string;
  score?: number;
  total?: number;
}

export interface AllProgress extends CompletedLesson {
  userId: string;
  userName: string;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private http = inject(HttpClient);
  private apiUrl = '/api/progress';

  private _completedLessons = signal<CompletedLesson[]>([]);
  completedLessons = this._completedLessons.asReadonly();

  private _progressLoaded = signal(false);
  progressLoaded = this._progressLoaded.asReadonly();

  totalLessons = 7;

  progressPercent = computed(() =>
    Math.round((this._completedLessons().length / this.totalLessons) * 100)
  );

  loadProgress(): Observable<CompletedLesson[]> {
    return this.http.get<CompletedLesson[]>(this.apiUrl).pipe(
      tap(data => {
        this._completedLessons.set(data);
        this._progressLoaded.set(true);
      }),
    );
  }

  isCompleted(lessonId: string): boolean {
    return this._completedLessons().some(l => l.lessonId === lessonId);
  }

  getAllProgress(): Observable<AllProgress[]> {
    return this.http.get<AllProgress[]>(`${this.apiUrl}/all`);
  }

  completeLesson(lessonId: string, lessonTitle: string, lessonCategory: string, score = 0, total = 0): Observable<CompletedLesson> {
    return this.http.post<CompletedLesson>(`${this.apiUrl}/complete`, { lessonId, lessonTitle, lessonCategory, score, total }).pipe(
      tap(entry => {
        if (!this.isCompleted(lessonId)) {
          this._completedLessons.update(list => [...list, entry]);
        }
      })
    );
  }

  uncompleteLesson(lessonId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lessonId}`).pipe(
      tap(() => this._completedLessons.update(list => list.filter(l => l.lessonId !== lessonId)))
    );
  }
}
