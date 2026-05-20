import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { DashboardComponent } from './features/dashboard/dashboard';
import { ProfileComponent } from './features/profile/profile';
import { LessonDetailComponent } from './features/lesson-detail/lesson-detail';
export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            // Redirección inicial: Al entrar a la web, nos manda directos al Dashboard
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

            // Ruta del Dashboard (Donde saldrá el mensaje de bienvenida)
            { path: 'dashboard', component: DashboardComponent },

            // Ruta del Perfil
            { path: 'profile', component: ProfileComponent },

            // Ruta de la Lección (Para que el Sidebar funcione al pulsar "Introducción")
            { path: 'lesson/:id', component: LessonDetailComponent }
        ]
    },
    // Comodín: Si alguien escribe una ruta que no existe, lo mandamos al dashboard
    { path: '**', redirectTo: 'dashboard' }
];