import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ProgressService } from '../../core/services/progress';
import { AchievementsService } from '../../core/services/achievements.service';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  progressService = inject(ProgressService);
  private lessonService = inject(LessonService);
  private achievementsService = inject(AchievementsService);

  user = this.authService.getCurrentUser();

  ngOnInit() {
    this.progressService.loadProgress().subscribe();
    this.lessonService.getLessons().subscribe();
  }

  get completedCount() { return this.progressService.completedLessons().length; }
  get totalLessons() { return this.progressService.totalLessons; }
  get pendingCount() { return this.totalLessons - this.completedCount; }
  get logrosCount() { return this.achievementsService.unlockedCount(); }

  logout() { this.authService.logout(); }
}
