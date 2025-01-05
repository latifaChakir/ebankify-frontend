import { HttpInterceptorFn } from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      // Gestion de l'erreur ici
      console.error('Erreur détectée :', error);
      // Vous pouvez également afficher un message à l'utilisateur ou rediriger vers une page d'erreur
      return throwError(() => new Error(error.message)); // Rejeter l'erreur pour être géré ailleurs
    })
  );
};
