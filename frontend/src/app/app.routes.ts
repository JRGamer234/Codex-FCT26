import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { DashboardComponent } from './features/dashboard/dashboard';
import { ProfileComponent } from './features/profile/profile';
import { LessonDetailComponent } from './features/lesson-detail/lesson-detail';
import { LessonFormComponent } from './features/lesson-form/lesson-form';
import { CatalogComponent } from './features/catalog/catalog'; // 👈 ¡NUEVA IMPORTACIÓN!

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'catalog', component: CatalogComponent }, // 👈 ¡NUEVA RUTA REGISTRADA!
            { path: 'profile', component: ProfileComponent },
            { path: 'lesson/:id', component: LessonDetailComponent },
            { path: 'create-lesson', component: LessonFormComponent }
        ]
    },
    { path: '**', redirectTo: 'dashboard' }
];