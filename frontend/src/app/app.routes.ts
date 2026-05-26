import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { LessonFormComponent } from './features/lesson-form/lesson-form';
import { DashboardComponent } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    redirectTo: ''
  },
  {
    path: 'lessons',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'form',
        component: LessonFormComponent
      }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];