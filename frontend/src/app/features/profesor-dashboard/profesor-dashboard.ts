import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, Alumno } from '../../core/services/user';
import { LessonService } from '../../core/services/lesson.service';
import { RatingService } from '../../core/services/rating.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesor-dashboard.html',
  styleUrl: './profesor-dashboard.scss'
})
export class ProfesorDashboardComponent implements OnInit {
  profesor = { name: '', email: '' };
  alumnos: Alumno[] = [];
  lessonCount = 0;
  totalTests = 0;
  ratingAverage: number | string = '—';

  constructor(
    private router: Router,
    private userService: UserService,
    private lessonService: LessonService,
    private ratingService: RatingService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.profesor = { name: user.name, email: user.email };

    this.userService.getAlumnos().subscribe({
      next: data => {
        this.alumnos = data;
        this.totalTests = data.reduce((sum, a) => sum + a.completedLessons, 0);
      }
    });

    this.lessonService.getLessons().subscribe({
      next: data => { this.lessonCount = data.length; }
    });

    this.ratingService.getStats().subscribe({
      next: stats => {
        this.ratingAverage = stats.total > 0 ? stats.average : '—';
      }
    });
  }

  logout() { this.authService.logout(); }

  navigate(path: string) { this.router.navigate([path]); }
}
