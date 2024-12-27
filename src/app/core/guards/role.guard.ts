import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'];
  const userRole = authService.getRole();

  if (userRole === requiredRole) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
