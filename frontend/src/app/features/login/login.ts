import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    if (email === 'alumno@codex.com' && password === '123456') {
      localStorage.setItem('token', 'fake-token-123');
      this.router.navigate(['/lessons/dashboard']);
    } else {
      this.errorMsg = 'Email o contraseña incorrectos';
    }
  }
}