import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Roles } from '../Models/user/Roles';
import { ProfileService } from '../services/profile.service';
import { ToastService } from '../components/toast/toast.service';

export const guestGuard: CanActivateFn = (_route, _state) => {
  // Injecting the required dependencies
  const router: Router = inject(Router);
  const profileService: ProfileService = inject(ProfileService);
  const toastService: ToastService = inject(ToastService);

  // Checking if the user is a guest
  if (profileService.getUser()?.role === Roles.GUEST) {
    toastService.showToast({
      type: 'info',
      message:
        'The chosen feature is not available for guest accounts. Please login with a valid email to visit this page !!',
    });

    router.navigate(['/dashboard/threads']).then();
    return false;
  } else {
    return true;
  }
};
