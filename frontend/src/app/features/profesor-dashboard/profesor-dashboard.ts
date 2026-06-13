import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserService, Alumno } from '../../core/services/user';
import { LessonService } from '../../core/services/lesson.service';
import { RatingService } from '../../core/services/rating.service';
import { AuthService } from '../../core/services/auth.service';
import { AvatarComponent } from '../../shared/avatar/avatar';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './profesor-dashboard.html',
  styleUrl: './profesor-dashboard.scss'
})
export class ProfesorDashboardComponent implements OnInit {
  profesor = { name: '', email: '' };
  alumnos: Alumno[] = [];
  lessonCount = 0;
  totalTests = 0;
  ratingAverage: number | string = '—';
  loading = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private lessonService: LessonService,
    private ratingService: RatingService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.profesor = { name: user.name, email: user.email };

    forkJoin({
      alumnos: this.userService.getAlumnos(),
      lessons: this.lessonService.getLessons(),
      stats: this.ratingService.getStats(),
    }).subscribe({
      next: ({ alumnos, lessons, stats }) => {
        this.alumnos = alumnos;
        this.totalTests = alumnos.reduce((sum, a) => sum + a.completedLessons, 0);
        this.lessonCount = lessons.length;
        this.ratingAverage = stats.total > 0 ? stats.average : '—';
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('[Dashboard] Error cargando datos:', err.status, err.message);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  logout() { this.authService.logout(); }

  navigate(path: string) { this.router.navigate([path]); }
}
