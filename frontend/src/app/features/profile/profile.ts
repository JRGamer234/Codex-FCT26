import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user';
import { ProgressService } from '../../core/services/progress';
import { AchievementsService } from '../../core/services/achievements.service';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  progressService = inject(ProgressService);
  private lessonService = inject(LessonService);
  private achievementsService = inject(AchievementsService);

  user = this.authService.getCurrentUser();

  // Cambio de contraseña
  showPasswordForm = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  pwSaving = false;
  pwError = '';
  pwSuccess = '';

  ngOnInit() {
    this.progressService.loadProgress().subscribe();
    this.lessonService.getLessons().subscribe();
  }

  get completedCount() { return this.progressService.completedLessons().length; }
  get totalLessons() { return this.progressService.totalLessons; }
  get pendingCount() { return this.totalLessons - this.completedCount; }
  get logrosCount() { return this.achievementsService.unlockedCount(); }

  changePassword() {
    this.pwError = '';
    this.pwSuccess = '';

    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.pwError = 'Rellena todos los campos';
      return;
    }
    if (this.newPassword.length < 6) {
      this.pwError = 'La nueva contraseña debe tener al menos 6 caracteres';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.pwError = 'Las contraseñas no coinciden';
      return;
    }

    this.pwSaving = true;
    this.userService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.pwSaving = false;
        this.pwSuccess = 'Contraseña actualizada correctamente';
        this.currentPassword = this.newPassword = this.confirmPassword = '';
        this.showPasswordForm = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.pwSaving = false;
        this.pwError = err.error?.message || 'Error al cambiar la contraseña';
        this.cdr.detectChanges();
      }
    });
  }

  logout() { this.authService.logout(); }
}
