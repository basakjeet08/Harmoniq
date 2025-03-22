import { Component, EventEmitter, Output } from '@angular/core';
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

  // These are the event emitters which will notify the parent about the api state
  @Output('onSuccess') successEmitter = new EventEmitter<void>();
  @Output('onLoading') loadingEmitter = new EventEmitter<boolean>();
  @Output('onError') errorEmitter = new EventEmitter<string>();

  // Injecting the necessary dependencies
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks the register button
  onRegisterClick() {
    // Setting the loading state
    this.loadingEmitter.emit(true);

    // Calling the api to register the user
    this.authService.registerMember(this.userInput).subscribe({
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

  // This function is invoked when the user clicks on the go to login button
  onGoToLoginClick() {
    this.router.navigate(['../', 'login'], { relativeTo: this.route });
  }
}
