import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../core/services/progress';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './progress.html',
  styleUrl: './progress.scss'
})
export class ProgressComponent {
  constructor(public progressService: ProgressService) {}

  get completedLessons() {
    return this.progressService.completedLessons();
  }

  get totalLessons() {
    return this.progressService.totalLessons;
  }

  get progressPercent() {
    return this.progressService.progressPercent();
  }
}