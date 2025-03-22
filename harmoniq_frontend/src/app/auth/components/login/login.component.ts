import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output('onLoading') loadingEmitter = new EventEmitter<boolean>();
  @Output('onError') errorEmitter = new EventEmitter<string>();

  // Injecting the necessary dependencies
  constructor(private authService: AuthService) {}

  // This function is invoked when the user clicks the login button
  onLoginClick() {
    // Setting the loading state
    this.loadingEmitter.emit(true);

    // Calling the API
    this.authService.login(this.userInput).subscribe({
      // Success State
      next: () => {
        this.loadingEmitter.emit(false);
        this.successEmitter.emit();
      },

      // Error State
      error: (error: Error) => {
        this.loadingEmitter.emit(false);
        this.errorEmitter.emit(error.message);
      },
    });
  }

  // This function is invoked when the user clicks on login as Guest Button
  onLoginAsGuestClick() {
    // Setting the loading state
    this.loadingEmitter.emit(true);

    // Calling the API
    this.authService.loginAsGuest().subscribe({
      // Success State
      next: () => {
        this.loadingEmitter.emit(false);
        this.successEmitter.emit();
      },

      // Error State
      error: (error: Error) => {
        this.loadingEmitter.emit(false);
        this.errorEmitter.emit(error.message);
      },
    });
  }
}
