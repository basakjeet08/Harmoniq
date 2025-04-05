import { Component } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import {
  ThreadHistoryItem,
  ThreadHistoryResponse,
} from 'src/app/shared/Models/thread/ThreadHistoryResponse';
import { UserDto } from 'src/app/shared/Models/user/UserDto';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  // This is the thread list and user data for the component
  threadList: ThreadHistoryItem[] = [];
  createdByUser: UserDto | null = null;

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private toastService: ToastService,
    private loaderService: LoaderService
  ) {}

  // Fetching the history thread list when the component is loaded
  ngOnInit(): void {
    this.fetchThreadHistory();
  }

  // This function fetches the history data from the API
  fetchThreadHistory() {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.threadService.fetchThreadHistory().subscribe({
      // Success State
      next: (threadHistory: ThreadHistoryResponse) => {
        this.loaderService.endLoading();
        this.threadList = threadHistory.threadList;
        this.createdByUser = threadHistory.createdBy;

        // Checking if the database is empty
        if (!this.threadList || this.threadList.length === 0) {
          this.toastService.showToast({
            type: 'info',
            message: `There are no Threads Posted yet. Head over to the Post a Thread section to post the first Thread !!`,
          });
        }
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the delete button
  onDeleteThreadClick(id: string) {
    // Setting the loading State
    this.loaderService.startLoading();

    // Calling the API
    this.threadService.deleteById(id).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Thread deleted successfully !!',
        });

        this.fetchThreadHistory();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
