import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Roles } from '../Models/user/Roles';
import { ProfileService } from '../services/profile.service';

export const guestGuard: CanActivateFn = (_route, _state) => {
  // Injecting the required dependencies
  const router = inject(Router);
  const profileService = inject(ProfileService);

  // Checking if the user is a guest
  if (profileService.getUser()?.role === Roles.GUEST) {
    router.navigate(['/dashboard/threads']);
    return false;
  } else {
    return true;
  }
};
