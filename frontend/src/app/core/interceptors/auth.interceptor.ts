import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const isAuthRoute = req.url.includes('/auth/');

  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !isAuthRoute) {
        localStorage.clear();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
