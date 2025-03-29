import { Component, OnInit } from '@angular/core';
import { UserDto } from '../shared/Models/user/UserDto';
import { Roles } from '../shared/Models/user/Roles';
import { ProfileService } from '../shared/services/profile.service';
import { ToastService } from '../shared/components/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // This contains the user data for the current profile
  userData: UserDto | undefined;
  isGuest: boolean = false;

  // injecting the necessary dependencies
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private toastService: ToastService
  ) {}

  // Checking if the user is a guest user or not
  ngOnInit(): void {
    this.userData = this.profileService.getUser();
    this.isGuest = this.userData?.role === Roles.GUEST;

    if (this.isGuest) {
      this.toastService.showToast({
        type: 'warning',
        message:
          "You are logged into the guest mode which lasts for only an hour. You won't be able to post any thread or chat with the chatbot. Please create a account and log in to access those features !!",
        duration: 4500,
      });
    }
  }

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
