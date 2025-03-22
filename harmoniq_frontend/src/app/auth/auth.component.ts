import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  // These are the details inputted by the user
  isLoginMode: boolean = true;
  userInput = { email: '', password: '', confirmPassword: '' };

  // Loading and Error States
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is called when the user wants to toggle login or register
  toggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // This function is called when the loading state changes
  onLoadingChange(newState: boolean) {
    this.isLoading = newState;
  }

  // This function is called when the Error State is changed
  onErrorChange(newState: string) {
    this.errorMessage = newState;
  }

  // This function is invoked when the user registration is successful
  onRegistrationSuccess() {
    this.isLoginMode = true;
  }

  // This function is invoked when the user login is successfull
  onLoginSuccess() {
    this.router.navigate(['../', 'dashboard'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the cancel error button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
