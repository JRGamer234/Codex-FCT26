import { Component, OnInit, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz';
import { ProgressService } from '../../core/services/progress';

declare const Prism: any;

export interface LessonSection { title: string; content: string; code?: string; }
export interface LessonQuestion { question: string; options: string[]; correct: number; }
export interface LessonData {
  _id: string;
  title: string;
  level: string;
  category: string;
  description: string;
  sections: LessonSection[];
  questions: LessonQuestion[];
}

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LessonQuizComponent],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.scss'
})
export class LessonDetailComponent implements OnInit, AfterViewChecked {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private progressService = inject(ProgressService);

  lesson: LessonData | null = null;
  showTest = false;
  loading = true;
  error = '';
  private highlighted = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      this.loading = true;
      this.showTest = false;
      this.highlighted = false;
      this.http.get<LessonData>(`http://localhost:3000/lessons/${id}`).subscribe({
        next: (data) => { this.lesson = data; this.loading = false; },
        error: () => { this.error = 'No se pudo cargar la lección.'; this.loading = false; }
      });
    });
  }

  ngAfterViewChecked() {
    if (!this.highlighted && this.lesson && !this.showTest) {
      try { Prism.highlightAll(); } catch (_) {}
      this.highlighted = true;
    }
  }

  getLangClass(code: string): string {
    return code.trim().startsWith('<') ? 'language-html' : 'language-css';
  }

  startTest() {
    this.showTest = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onLessonCompleted() {
    if (!this.lesson) return;
    this.progressService.completeLesson(this.lesson._id, this.lesson.title, this.lesson.category).subscribe();
  }
}
