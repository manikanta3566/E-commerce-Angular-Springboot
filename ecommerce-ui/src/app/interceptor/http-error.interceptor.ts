import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong. Please try again later.';

      if (error.status === 0) {
        // Backend is down or CORS/network issue
        message =
          'Server is unreachable. Please check your internet or try again later.';
      } else if (error.status >= 500) {
        message = 'Server error. Please try again later.';
      } else if (error.status === 404) {
        message = 'Requested resource not found.';
      }

      snackBar.open(message, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });

      return throwError(() => error);
    })
  );
};
