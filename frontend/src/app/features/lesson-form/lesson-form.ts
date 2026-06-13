import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './lesson-form.html',
  styleUrl: './lesson-form.scss'
})
export class LessonFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private lessonService = inject(LessonService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editId: string | null = null;
  get isEditMode() { return !!this.editId; }

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

  ngOnInit() {
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.lessonService.getLessonById(this.editId).subscribe({
        next: lesson => this.populateForm(lesson),
        error: () => { this.errorMessage = 'No se pudo cargar la lección.'; }
      });
    }
  }

  private populateForm(lesson: any) {
    this.lessonForm.patchValue({
      title: lesson.title,
      description: lesson.description,
      level: lesson.level,
      category: lesson.category,
    });

    // Rebuild sections array
    while (this.sections.length) this.sections.removeAt(0);
    (lesson.sections || []).forEach((s: any) => {
      this.sections.push(this.fb.group({
        title: [s.title, Validators.required],
        content: [s.content, Validators.required],
        code: [s.code || ''],
      }));
    });
    if (!this.sections.length) this.sections.push(this.createSection());

    // Rebuild questions array
    while (this.questions.length) this.questions.removeAt(0);
    (lesson.questions || []).forEach((q: any) => {
      this.questions.push(this.fb.group({
        question: [q.question, Validators.required],
        options: this.fb.array(
          (q.options || ['', '', '', '']).map((o: string) => this.fb.control(o, Validators.required))
        ),
        correct: [q.correct, Validators.required],
      }));
    });
    if (!this.questions.length) this.questions.push(this.createQuestion());
  }

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

    const request$ = this.isEditMode
      ? this.lessonService.updateLesson(this.editId!, payload as any)
      : this.lessonService.createLesson(payload as any);

    request$.subscribe({
      next: () => { this.isSubmitting = false; this.router.navigate(['/profesor/lecciones']); },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Error al guardar la lección.';
      }
    });
  }
}
