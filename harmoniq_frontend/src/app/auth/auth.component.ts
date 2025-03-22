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
