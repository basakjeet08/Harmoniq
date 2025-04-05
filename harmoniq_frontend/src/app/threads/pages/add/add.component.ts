import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { scaleUpAnimation } from 'src/app/shared/animations/scale-up-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  animations: [scaleUpAnimation],
})
export class AddComponent {
  // These are the details inputted by the user
  userInput = { description: '' };
  loaderState!: boolean;

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private location: Location
  ) {
    this.loaderService.loaderState$.subscribe(
      (state) => (this.loaderState = state)
    );
  }

  // This function is invoked when the user clicks on the post thread button
  onPostClick() {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.threadService.create(this.userInput).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Thread created successfully !!',
        });

        this.location.back();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on cancel button
  onCancelClick() {
    this.location.back();
  }
}
