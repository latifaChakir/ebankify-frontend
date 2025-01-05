import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import {inject} from "@angular/core";

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'];
  console.log(requiredRole);
  const userRole = authService.getRole();

  if (userRole === requiredRole) {
    return true;
  } else {
    router.navigate(['/NotAuthorized']);
    return false;
  }
};
