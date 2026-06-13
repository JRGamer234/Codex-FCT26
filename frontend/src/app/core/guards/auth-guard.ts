import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token) return router.createUrlTree(['/login']);

  const url = state.url;
  const isProfesorRoute = url.startsWith('/profesor') || url.startsWith('/create-lesson') || url.startsWith('/edit-lesson');

  // Profesor intentando acceder a rutas de alumno → su dashboard
  if (rol === 'profesor' && !isProfesorRoute) {
    return router.createUrlTree(['/profesor/dashboard']);
  }

  // Alumno intentando acceder a rutas de profesor → su dashboard
  if (rol !== 'profesor' && isProfesorRoute) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
