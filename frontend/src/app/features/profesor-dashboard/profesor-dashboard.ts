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
  { name: 'Alex', progress: 30, completedLessons: 2 },
  { name: 'Jorge', progress: 45, completedLessons: 3 },
  { name: 'Mario', progress: 60, completedLessons: 4 },
  { name: 'Itziar', progress: 55, completedLessons: 5 },
];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}