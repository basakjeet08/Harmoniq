import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  // These are the details inputted by the user
  userInput = { description: '' };

  // These are the loading
  isLoading: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private toastService: ToastService,
    private location: Location
  ) {}

  // This function is invoked when the user clicks on the post thread button
  onPostClick() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the API
    this.threadService.create(this.userInput).subscribe({
      // Success State
      next: () => {
        this.isLoading = false;
        this.location.back();
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on cancel button
  onCancelClick() {
    this.location.back();
  }
}
