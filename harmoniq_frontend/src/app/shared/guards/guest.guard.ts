import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Roles } from '../Models/user/Roles';

export const guestGuard: CanActivateFn = (_route, _state) => {
  // Injecting the required dependencies
  const router = inject(Router);
  const authService = inject(AuthService);

  // Checking if the user is a guest
  if (authService.getUser()?.role === Roles.GUEST) {
    router.navigate(['/dashboard/threads']);
    return false;
  } else {
    return true;
  }
};
