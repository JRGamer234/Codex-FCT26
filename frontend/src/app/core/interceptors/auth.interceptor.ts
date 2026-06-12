import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

let redirectingToLogin = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const isAuthRoute = req.url.includes('/auth/');

  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !isAuthRoute && !redirectingToLogin) {
        redirectingToLogin = true;
        localStorage.clear();
        router.navigate(['/login']).then(() => {
          redirectingToLogin = false;
        });
      }
      return throwError(() => err);
    })
  );
};
