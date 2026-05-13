import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    redirectTo: ''
  },
  {
    path: 'lessons',
    canActivate: [authGuard],
    children: []
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];