import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { DashboardComponent } from './features/dashboard/dashboard';
import { CatalogComponent } from './features/catalog/catalog';
import { ProfileComponent } from './features/profile/profile';
import { LessonDetailComponent } from './features/lesson-detail/lesson-detail';
import { LessonFormComponent } from './features/lesson-form/lesson-form';
import { LoginComponent } from './features/login/login';
import { RegisterComponent } from './features/register/register';
import { ProgressComponent } from './features/progress/progress';
import { AchievementsComponent } from './features/achievements/achievements';
import { ProfesorDashboardComponent } from './features/profesor-dashboard/profesor-dashboard';
import { ProfesorAlumnosComponent } from './features/profesor-alumnos/profesor-alumnos';
import { ProfesorLeccionesComponent } from './features/profesor-lecciones/profesor-lecciones';
import { ProfesorTestsComponent } from './features/profesor-tests/profesor-tests';
import { ProfesorValoracionesComponent } from './features/profesor-valoraciones/profesor-valoraciones';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-lesson', component: LessonFormComponent, canActivate: [authGuard] },
  { path: 'edit-lesson/:id', component: LessonFormComponent, canActivate: [authGuard] },
  { path: 'profesor/dashboard', component: ProfesorDashboardComponent, canActivate: [authGuard] },
  { path: 'profesor/alumnos', component: ProfesorAlumnosComponent, canActivate: [authGuard] },
  { path: 'profesor/lecciones', component: ProfesorLeccionesComponent, canActivate: [authGuard] },
  { path: 'profesor/tests', component: ProfesorTestsComponent, canActivate: [authGuard] },
  { path: 'profesor/valoraciones', component: ProfesorValoracionesComponent, canActivate: [authGuard] },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'lesson/:id', component: LessonDetailComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'achievements', component: AchievementsComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
