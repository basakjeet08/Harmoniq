import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadDetailResponse } from 'src/app/shared/Models/thread/ThreadDetailResponse';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  // This is the data for the component
  threadDetail: ThreadDetailResponse | null = null;

  // These are the loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private route: ActivatedRoute
  ) {}

  // Fetching the thread id and then fetching its details
  ngOnInit(): void {
    const threadId = this.route.snapshot.params['id'] || '';

    // Checking if there is a thread ID provided
    if (threadId) {
      this.fetchThreadData(threadId);
    } else {
      this.errorMessage = 'There is no ID Provided ';
    }
  }

  // This function fetches the thread Details from the API Call
  fetchThreadData(threadId: string) {
    // Setting the loading state
    this.isLoading = true;

    // Calling the Api
    this.threadService.findById(threadId).subscribe({
      // Success State
      next: (threadDetail: ThreadDetailResponse) => {
        this.isLoading = false;
        this.threadDetail = threadDetail;

        console.log(this.threadDetail);
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the comment button
  onCommentClick(comment: string) {
    console.log(comment);
  }

  // This function is invoked when the user clicks on the cancel Error Button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
