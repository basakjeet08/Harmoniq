import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Injecting the necessary dependencies
  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router
  ) {}

  // This function is invoked when the user clicks the logout button
  onLogoutClick() {
    // Clearing out the cache of the current user data and navigating back to login page
    this.profileService.logout();
    this.toastService.showToast({
      type: 'success',
      message: 'User logged out successfully !!',
    });
    this.router.navigate(['/auth']);
  }
}
