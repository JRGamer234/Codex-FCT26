import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ProgressService } from '../../core/services/progress';

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

  user = this.authService.getCurrentUser();

  ngOnInit() {
    this.progressService.loadProgress().subscribe();
  }

  get completedCount() { return this.progressService.completedLessons().length; }
  get totalLessons() { return this.progressService.totalLessons; }
  get pendingCount() { return this.totalLessons - this.completedCount; }

  logout() { this.authService.logout(); }
}
