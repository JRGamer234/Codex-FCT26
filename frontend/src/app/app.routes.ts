import { Routes } from '@angular/router';
// Importamos la clase desde el archivo .ts que tienes
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            // Aquí irá el contenido más adelante
        ]
    }
];