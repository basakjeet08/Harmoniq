import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
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

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private toastService: ToastService,
    private loaderService: LoaderService,
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
    this.loaderService.startLoading();

    // Calling the fetching API
    this.threadService.findAll().subscribe({
      // Success State
      next: (threadList: ThreadDto[]) => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Threads fetched Successfully !!',
        });

        this.threadList = threadList;

        if (this.threadList.length === 0) {
          this.toastService.showToast({
            type: 'info',
            message: `There are no Threads Posted yet. Head over to the post a thread section to post your first Thread !!`,
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

  // This function is invoked when the user clicks on the search button
  onSearchClick(searchInput: string) {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the fetching API
    this.threadService.findByTags(searchInput).subscribe({
      // Success State
      next: (threadList: ThreadDto[]) => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Threads fetched Successfully !!',
        });

        this.threadList = threadList;

        if (this.threadList.length === 0) {
          this.toastService.showToast({
            type: 'info',
            message: `There are no Threads Posted by this tag yet. Head over to the post a thread section to post your first Thread !!`,
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

  // This function is executed when the user clicks on any of the card for Thread
  onThreadCardClick(id: string) {
    this.router.navigate(['../', 'details', id], { relativeTo: this.route });
  }
}
