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

  // These are the event emitters which will notify the parent about the api state
  @Output('onSuccess') successEmitter = new EventEmitter<void>();

  // Injecting the necessary dependencies
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  // This function is invoked when the user clicks the login button
  onLoginClick() {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.authService.login(this.userInput).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();
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
  onLoginAsGuestClick() {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.authService.loginAsGuest().subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();
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
