import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesor-dashboard.html',
  styleUrl: './profesor-dashboard.scss'
})
export class ProfesorDashboardComponent {
  profesor = {
    name: 'Profesor Codex',
    email: 'profesor@codex.com',
    avatar: '👨‍🏫'
  };

  stats = [
    { icon: '👨‍🎓', label: 'Alumnos activos', value: 24 },
    { icon: '📚', label: 'Lecciones creadas', value: 7 },
    { icon: '✅', label: 'Tests completados', value: 132 },
    { icon: '⭐', label: 'Valoración media', value: '4.8' }
  ];

  alumnos = [
    { name: 'Itziar', progress: 75, completedLessons: 5 },
    { name: 'Mario', progress: 50, completedLessons: 3 },
    { name: 'Jorge', progress: 25, completedLessons: 2 },
    { name: 'Ana', progress: 100, completedLessons: 7 },
  ];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}