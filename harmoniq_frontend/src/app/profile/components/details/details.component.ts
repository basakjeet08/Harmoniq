import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Roles } from 'src/app/shared/Models/user/Roles';
import { UserDto } from 'src/app/shared/Models/user/UserDto';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  // Bindings with the parent component
  @Output('onEditClick') editEmitter = new EventEmitter<void>();

  // This is the data for the component
  userData: UserDto | null = null;
  isOwner: boolean = false;
  isGuestMode: boolean = false;
  loaderState!: boolean;

  // Injecting the necessary dependencies
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loaderService.loaderState$.subscribe(
      (state) => (this.loaderState = state)
    );
  }

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
        this.isOwner = this.userData.id === this.profileService.getUser()?.id;
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the delete button
  onDeleteClick() {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the Api
    this.userService.deleteUser().subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'User deleted successfully !!',
        });

        this.profileService.logout();
        this.router.navigate(['/auth']);
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
    this.editEmitter.emit();
  }
}
