import { Component, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // These are the details inputted by the user
  userInput = { email: '', password: '' };
  loaderState!: boolean;

  // These are the event emitters which will notify the parent about the api state
  @Output('onSuccess') successEmitter: EventEmitter<void> = new EventEmitter<void>();

  // Injecting the necessary dependencies
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private toastService: ToastService,
  ) {
    this.loaderService.loaderState$.subscribe(
      (state: boolean): boolean => (this.loaderState = state),
    );
  }

  // This function is invoked when the user clicks the login button
  onLoginClick(): void {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.authService.login(this.userInput).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        // Showing success toast
        this.toastService.showToast({
          type: 'success',
          message: 'User logged in successfully !!',
        });

        this.successEmitter.emit();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on login as Guest Button
  onLoginAsGuestClick(): void {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.authService.loginAsGuest().subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        // Showing success toast
        this.toastService.showToast({
          type: 'success',
          message: 'User logged in as guest successfully !!',
        });

        this.successEmitter.emit();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
