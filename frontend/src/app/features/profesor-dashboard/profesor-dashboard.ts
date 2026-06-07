import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, Alumno } from '../../core/services/user';
import { LessonService } from '../../core/services/lesson.service';
import { RatingService, RatingStats } from '../../core/services/rating.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesor-dashboard.html',
  styleUrl: './profesor-dashboard.scss'
})
export class ProfesorDashboardComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private lessonService = inject(LessonService);
  private ratingService = inject(RatingService);
  private authService = inject(AuthService);

  profesor = this.authService.getCurrentUser();

  alumnos = signal<Alumno[]>([]);
  ratingStats = signal<RatingStats>({ total: 0, average: 0 });

  lessonCount = computed(() => this.lessonService.lessons().length);
  totalTests = computed(() => this.alumnos().reduce((sum, a) => sum + a.completedLessons, 0));

  ngOnInit() {
    this.userService.getAlumnos().subscribe(data => this.alumnos.set(data));
    this.lessonService.getLessons().subscribe();
    this.ratingService.getStats().subscribe(stats => this.ratingStats.set(stats));
  }

  logout() {
    this.authService.logout();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
