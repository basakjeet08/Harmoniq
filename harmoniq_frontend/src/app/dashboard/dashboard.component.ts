import { Component, OnInit } from '@angular/core';
import { Roles } from '../shared/Models/user/Roles';
import { ProfileService } from '../shared/services/profile.service';
import { ToastService } from '../shared/components/toast/toast.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../shared/Models/auth/AuthResponse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // This contains the user data for the current profile
  userData!: AuthResponse;
  isGuest: boolean = false;

  // Profile Pic Expand Option
  isExpanded: boolean = false;

  // injecting the necessary dependencies
  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router
  ) {}

  // Checking if the user is a guest user or not
  ngOnInit(): void {
    const storedAuthRes = this.profileService.getUser();

    // If the user deletes his data from the local storage
    if (!storedAuthRes) {
      this.toastService.showToast({
        type: 'error',
        message: 'User data not found, Please login into the website again',
      });

      this.onLogoutClick(false);
    } else {
      this.userData = storedAuthRes;
      this.isGuest = storedAuthRes.role === Roles.GUEST;
    }

    // Showing the guest some curated content about account deletion
    if (this.isGuest) {
      this.toastService.showToast({
        type: 'warning',
        message:
          "You are logged into the guest mode which lasts for only an hour. You won't be able to post any thread or chat with the chatbot. Please create a account and log in to access those features !!",
        duration: 4500,
      });
    }
  }

  // This function is invoked when the user clicks on the profile pic
  toggleProfileClick() {
    this.isExpanded = !this.isExpanded;
  }

  // This function is invoked when the user clicks the logout button
  onLogoutClick(showToast: boolean = true) {
    // Clearing out the cache of the current user data and navigating back to login page
    this.profileService.logout();

    if (showToast) {
      this.toastService.showToast({
        type: 'success',
        message: 'User logged out successfully !!',
      });
    }
    this.router.navigate(['/auth']);
  }
}
