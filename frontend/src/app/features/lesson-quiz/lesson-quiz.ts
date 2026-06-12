import { Component, Input, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../../core/services/progress';
import { RatingService } from '../../core/services/rating.service';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-lesson-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson-quiz.html',
  styleUrl: './lesson-quiz.scss'
})
export class LessonQuizComponent implements OnInit {
  @Input() questions: Question[] = [];
  @Input() lessonId: string = '';
  @Input() lessonTitle: string = '';
  @Input() lessonCategory: string = '';
  @Output() lessonCompleted = new EventEmitter<void>();

  private progressService = inject(ProgressService);
  private ratingService = inject(RatingService);

  currentIndex = 0;
  selectedOption: number | null = null;
  answers: (number | null)[] = [];
  finished = false;

  selectedStars = 0;
  ratingComment = '';
  ratingSubmitted = false;

  ngOnInit() {
    if (this.questions.length === 0) {
      this.questions = [];
    }
  }

  get currentQuestion(): Question {
    return this.questions[this.currentIndex];
  }

  get score(): number {
    return this.answers.filter((a, i) => a === this.questions[i].correct).length;
  }

  selectOption(index: number) {
    this.selectedOption = index;
  }

  next() {
    if (this.selectedOption === null) return;
    this.answers.push(this.selectedOption);
    this.selectedOption = null;

    if (this.currentIndex + 1 < this.questions.length) {
      this.currentIndex++;
    } else {
      this.finished = true;
      if (this.lessonId) {
        this.progressService.completeLesson(this.lessonId, this.lessonTitle, this.lessonCategory, this.score, this.questions.length).subscribe();
        this.lessonCompleted.emit();
      }
    }
  }

  setStars(n: number) {
    this.selectedStars = n;
  }

  submitRating() {
    if (!this.selectedStars) return;
    this.ratingService.submitRating(this.lessonId, this.lessonTitle, this.selectedStars, this.ratingComment).subscribe({
      next: () => { this.ratingSubmitted = true; },
      error: () => { this.ratingSubmitted = true; },
    });
  }

  restart() {
    this.currentIndex = 0;
    this.selectedOption = null;
    this.answers = [];
    this.finished = false;
    this.selectedStars = 0;
    this.ratingComment = '';
    this.ratingSubmitted = false;
  }
}
