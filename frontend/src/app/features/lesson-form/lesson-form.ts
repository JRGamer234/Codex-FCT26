import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lesson-form.html',
  styleUrl: './lesson-form.scss'
})
export class LessonFormComponent {
  lessonForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.lessonForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      level: ['', Validators.required],
      category: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.lessonForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.lessonForm.valid) {
      console.log('Formulario enviado:', this.lessonForm.value);
    }
  }
}
