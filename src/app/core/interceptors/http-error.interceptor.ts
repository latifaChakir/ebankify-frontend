import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue.';
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.status) {
        errorMessage = `Erreur ${error.status}: ${error.statusText}`;
      }
      return throwError(() => new Error(errorMessage));
    })
  );
};
