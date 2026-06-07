import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AchievementsService } from '../../core/services/achievements.service';
import { ProgressService } from '../../core/services/progress';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss'
})
export class AchievementsComponent implements OnInit {
  private progressService = inject(ProgressService);
  private lessonService = inject(LessonService);
  achievementsService = inject(AchievementsService);

  get achievements() { return this.achievementsService.achievements(); }
  get unlockedCount() { return this.achievementsService.unlockedCount(); }

  ngOnInit() {
    this.progressService.loadProgress().subscribe();
    this.lessonService.getLessons().subscribe();
  }
}
