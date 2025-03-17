import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// This guard checks if the user is logged in or not
export const authGuard: CanActivateFn = (_route, _state) => {
  // Injecting the required dependencies
  const router = inject(Router);
  const authService = inject(AuthService);

  // Checking if the user is logged in or not
  if (authService.getUser()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
