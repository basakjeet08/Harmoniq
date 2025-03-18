import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  // These are the loading and error state variables
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching the history thread list when the component is loaded
  ngOnInit(): void {
    this.fetchThreadHistory();
  }

  // This function fetches the history data from the API
  fetchThreadHistory() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the API
    this.threadService.fetchThreadHistory().subscribe({
      // Success State
      next: (threadHistory: ThreadHistoryResponse) => {
        this.isLoading = false;
        this.threadList = threadHistory.threadList;
        this.createdByUser = threadHistory.createdBy;

        // Checking if the database is empty
        if (!this.threadList) {
          this.errorMessage = `There are no Threads Posted yet. Head over to the
          Post a Thread section to post the first Thread !!`;
        }
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is executed when the user clicks on any of the card for Thread
  onThreadCardClick(id: string) {
    this.router.navigate(['../', 'details', id], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the delete button
  onDeleteThreadClick(id: string) {
    // Setting the loading State
    this.isLoading = true;

    // Calling the API
    this.threadService.deleteById(id).subscribe({
      // Success State
      next: () => {
        this.isLoading = false;
        this.fetchThreadHistory();
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the cancel Error Button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
