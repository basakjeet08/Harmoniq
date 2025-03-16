import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // These are the details inputted by the user
  userInput = { email: '', password: '', confirmPassword: '' };

  // Error and loading states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks the register button
  onRegisterClick() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the api to register the user
    this.authService.registerMember(this.userInput).subscribe({
      // Success State
      next: () => {
        this.isLoading = false;

        // Redirecting to the login page
        this.onGoToLoginClick();
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the go to login button
  onGoToLoginClick() {
    this.router.navigate(['../', 'login'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the cancel error button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
