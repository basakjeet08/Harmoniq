import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadDto } from 'src/app/shared/Models/thread/ThreadDto';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  // This is the thread list for the component
  threadList: ThreadDto[] = [];

  // These are the loading and error state variables
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching the thread list when the component is loaded
  ngOnInit(): void {
    this.fetchThreadData();
  }

  // This function fetches the feed data from the API
  fetchThreadData() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the fetching API
    this.threadService.findAll().subscribe({
      // Success State
      next: (threadList: ThreadDto[]) => {
        this.isLoading = false;
        this.threadList = threadList;
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the search button
  onSearchClick(searchInput: string) {
    console.log(searchInput);
  }

  // This function is executed when the user clicks on any of the card for Thread
  onThreadCardClick(id: string) {
    this.router.navigate(['../', 'details', id], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the cancel Error Button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
