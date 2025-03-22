import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/components/toast/toast.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  // These are the details inputted by the user
  isLoginMode: boolean = true;
  userInput = { email: '', password: '', confirmPassword: '' };

  // Loading States
  isLoading: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

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
    this.toastService.showToast({ type: 'error', message: newState });
  }

  // This function is invoked when the user registration is successful
  onRegistrationSuccess() {
    this.isLoginMode = true;
    this.toastService.showToast({
      type: 'success',
      message: 'User Registered Successfully !!',
    });
  }

  // This function is invoked when the user login is successfull
  onLoginSuccess() {
    this.router.navigate(['../', 'dashboard'], { relativeTo: this.route });
  }
}
