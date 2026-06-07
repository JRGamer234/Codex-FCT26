import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './lesson-form.html',
  styleUrl: './lesson-form.scss'
})
export class LessonFormComponent {
  private fb = inject(FormBuilder);
  private lessonService = inject(LessonService);
  private router = inject(Router);

  lessonForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    level: ['Inicial', Validators.required],
    category: ['HTML', Validators.required],
    sections: this.fb.array([this.createSection()]),
    questions: this.fb.array([this.createQuestion()]),
  });

  isSubmitting = false;
  errorMessage = '';

  get sections(): FormArray { return this.lessonForm.get('sections') as FormArray; }
  get questions(): FormArray { return this.lessonForm.get('questions') as FormArray; }

  sectionGroup(ctrl: AbstractControl): FormGroup { return ctrl as FormGroup; }
  questionGroup(ctrl: AbstractControl): FormGroup { return ctrl as FormGroup; }
  optionsArray(q: AbstractControl): FormArray { return (q as FormGroup).get('options') as FormArray; }

  createSection(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      code: [''],
    });
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
      correct: [0, Validators.required],
    });
  }

  addSection() { this.sections.push(this.createSection()); }
  removeSection(i: number) { if (this.sections.length > 1) this.sections.removeAt(i); }

  addQuestion() { this.questions.push(this.createQuestion()); }
  removeQuestion(i: number) { if (this.questions.length > 1) this.questions.removeAt(i); }

  onSubmit() {
    if (this.lessonForm.invalid) {
      this.lessonForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const raw = this.lessonForm.value;
    const payload = {
      title: raw.title,
      description: raw.description,
      level: raw.level,
      category: raw.category,
      sections: raw.sections.map((s: any) => ({
        title: s.title,
        content: s.content,
        ...(s.code?.trim() ? { code: s.code.trim() } : {}),
      })),
      questions: raw.questions.map((q: any) => ({
        question: q.question,
        options: q.options,
        correct: Number(q.correct),
      })),
    };

    this.lessonService.createLesson(payload as any).subscribe({
      next: () => { this.isSubmitting = false; this.router.navigate(['/catalog']); },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Error al crear la lección.';
      }
    });
  }
}
