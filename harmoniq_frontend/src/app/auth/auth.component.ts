import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scaleUpAnimation } from '../shared/animations/scale-up-animation';
import { slideLeftAnimation } from '../shared/animations/slide-left-animation';
import { slideRightAnimation } from '../shared/animations/slide-right-animation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [scaleUpAnimation, slideLeftAnimation, slideRightAnimation],
})
export class AuthComponent {
  // These are the details inputted by the user
  isLoginMode: boolean = true;

  // Injecting the necessary dependencies
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  // This function is called when the user wants to toggle login or register
  toggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // This function is invoked when the user registration is successful
  onRegistrationSuccess(): void {
    this.isLoginMode = true;
  }

  // This function is invoked when the user login is successful
  onLoginSuccess(): void {
    this.router.navigate(['../', 'dashboard'], { relativeTo: this.route }).then();
  }
}
