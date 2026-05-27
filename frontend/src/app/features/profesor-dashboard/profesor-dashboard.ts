import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, Alumno } from '../../core/services/user';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesor-dashboard.html',
  styleUrl: './profesor-dashboard.scss'
})
export class ProfesorDashboardComponent implements OnInit {
  profesor = {
    name: 'Profesor Codex',
    email: 'profesor@codex.com',
    avatar: '👨‍🏫'
  };

  stats = [
    { icon: '👨‍🎓', label: 'Alumnos activos', value: 4 },
    { icon: '📚', label: 'Lecciones creadas', value: 7 },
    { icon: '✅', label: 'Tests completados', value: 132 },
    { icon: '⭐', label: 'Valoración media', value: '4.8' }
  ];

  alumnos: Alumno[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getAlumnos().subscribe(data => {
      this.alumnos = data;
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}