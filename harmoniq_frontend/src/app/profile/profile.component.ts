import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { LoaderService } from '../shared/components/loader/loader.service';
import { ToastService } from '../shared/components/toast/toast.service';
import { UserDto } from '../shared/Models/user/UserDto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { Roles } from '../shared/Models/user/Roles';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // This is the data for the component
  userData!: UserDto;
  isOwner: boolean = false;
  isGuestMode: boolean = false;
  isEditMode: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching the User Details on comonent init
  ngOnInit(): void {
    this.route.params.subscribe((params) => this.fetchUserData(params['id']));
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

        this.isGuestMode = userData.role === Roles.GUEST;

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

  // This function is invoked when the user clicks on the edit button
  onEditToggle() {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode !== true) {
      this.fetchUserData(this.userData.id);
    }
  }

  // This function is invoked when the user clicks on the delete button
  onDeleteClick() {
    // Starting the loading state
    this.loaderService.startLoading();

    this.userService.deleteUser().subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();
        this.profileService.logout();

        this.toastService.showToast({
          type: 'success',
          message: 'User deleted successfully !!',
        });

        this.router.navigate(['/auth']);
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the submit edition
  onEditComplete() {
    // Starting the loading state
    this.loaderService.startLoading();

    this.userService.updateUser(this.userData).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'User Edited successfully !!',
        });

        this.isEditMode = false;
        this.fetchUserData(this.userData.id);
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
