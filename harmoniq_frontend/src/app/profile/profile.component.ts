import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { LoaderService } from '../shared/components/loader/loader.service';
import { ToastService } from '../shared/components/toast/toast.service';
import { UserDto } from '../shared/Models/user/UserDto';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // This is the data for the component
  userData!: UserDto;
  isOwner: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  // Fetching the User Details on comonent init
  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.fetchUserData(userId);
  }

  // This function fetches the user data from the database
  fetchUserData(userId: string) {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.userService.findUserById(userId).subscribe({
      // Success State
      next: (userData: UserDto) => {
        this.loaderService.endLoading();
        this.userData = userData;

        // If the current user at view viewing his own profile
        if (this.userData.id === this.profileService.getUser()?.id) {
          this.isOwner = true;
        }

        this.toastService.showToast({
          type: 'success',
          message: 'User data fetched successfully !!',
        });
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
