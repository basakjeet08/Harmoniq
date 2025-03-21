import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

// This guard checks if the user is logged in or not
export const authGuard: CanActivateFn = (_route, _state) => {
  // Injecting the required dependencies
  const router = inject(Router);
  const profileService = inject(ProfileService);

  // Checking if the user is logged in or not
  if (profileService.getUser()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
