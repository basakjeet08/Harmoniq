import { Component, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
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

  // Injecting the necessary dependencies
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  // This function is invoked when the user clicks the register button
  onRegisterClick() {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the api to register the user
    this.authService.registerMember(this.userInput).subscribe({
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
