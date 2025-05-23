import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { UserDto } from 'src/app/shared/Models/user/UserDto';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  // Values to be given by the parent component
  @Output('onEditClose') editCloseEmitter = new EventEmitter<void>();

  // These are the data for the component
  userData: UserDto = { id: '', name: '', email: '', password: '', avatar: '' };
  loaderState!: boolean;

  // Injecting the necessary dependencies
  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loaderService.loaderState$.subscribe((state) => (this.loaderState = state));
  }

  // Fetching the User Details on component init
  ngOnInit(): void {
    this.route.params.subscribe((params) => this.fetchUserData(params['id']));
  }

  // This function fetches the user data from the database
  fetchUserData(userId: string): void {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.userService.findUserById(userId).subscribe({
      // Success State
      next: (userData: UserDto) => {
        this.loaderService.endLoading();
        this.userData = userData;
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function sets the new chosen avatar
  onAvatarChanged(avatarLink: string): void {
    this.userData.avatar = avatarLink;
  }

  // This function is invoked when the user clicks on the submit edition
  onSubmitClick(): void {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the Api
    this.userService.updateUser(this.userData).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'User Edited successfully! Please login to your account again',
        });

        this.router.navigate(['/auth']).then();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user close the edit mode
  onEditClose(): void {
    this.editCloseEmitter.emit();
  }
}
