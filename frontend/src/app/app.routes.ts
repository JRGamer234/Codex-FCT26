import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { LessonFormComponent } from './features/lesson-form/lesson-form';
import { DashboardComponent } from './features/dashboard/dashboard';
import { LessonDetailComponent } from './features/lesson-detail/lesson-detail';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { LoginComponent } from './features/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'lessons',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'detail',
        component: LessonDetailComponent
      },
      {
        path: 'form',
        component: LessonFormComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];