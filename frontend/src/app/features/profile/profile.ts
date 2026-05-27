import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent {
  user = {
    name: 'Itziar',
    email: 'alumno@codex.com',
    avatar: '👩‍💻',
    joinedAt: 'Mayo 2026',
    level: 'Inicial',
    lessonsCompleted: 3,
    totalLessons: 12,
    achievements: 2
  };

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}