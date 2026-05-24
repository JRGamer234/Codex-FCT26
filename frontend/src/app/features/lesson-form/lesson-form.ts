import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
    content: ['', [Validators.required]],
    duration: [30, [Validators.required, Validators.min(1)]],
    level: ['Inicial', [Validators.required]]
  });

  isSubmitting = false;
  errorMessage = '';

  onSubmit() {
    if (this.lessonForm.invalid) {
      this.lessonForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.lessonService.createLesson(this.lessonForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        this.errorMessage = 'Hubo un error al crear la lección. Por favor, inténtalo de nuevo.';
      }
    });
  }
}
