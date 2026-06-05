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

  users = [
    { email: 'alumno@codex.com', password: '123456', rol: 'alumno' },
    { email: 'profesor@codex.com', password: '123456', rol: 'profesor' }
  ];

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
    const user = this.users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('token', 'fake-token-123');
      localStorage.setItem('rol', user.rol);

      if (user.rol === 'profesor') {
        this.router.navigate(['/profesor/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.errorMsg = 'Email o contraseña incorrectos';
    }
  }
}