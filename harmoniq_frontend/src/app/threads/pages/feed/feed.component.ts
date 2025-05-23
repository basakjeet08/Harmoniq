import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ThreadDto } from 'src/app/shared/Models/thread/ThreadDto';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { Observable } from 'rxjs';
import { PageWrapper } from '../../../shared/Models/common/PageWrapper';

// Fetching type for this component
type FetchType = 'PERSONALISED' | 'TAG_BASED' | 'POPULAR';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  animations: [staggerAnimation],
})
export class FeedComponent implements OnInit {
  // This is the thread list for the component
  threadList: ThreadDto[] = [];
  loaderState!: boolean;
  fetchType: FetchType = 'PERSONALISED';
  userEnteredTag: string = '';
  fetchFilters: FetchType[] = ['TAG_BASED', 'PERSONALISED', 'POPULAR'];

  // Paging data values
  page: number = 0;
  pageSize: number = 10;
  lastPage: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loaderService.loaderState$.subscribe((state) => (this.loaderState = state));
  }

  // Fetching the thread list when the component is loaded
  ngOnInit(): void {
    this.loadMoreFeeds();
  }

  // This function loads More data
  loadMoreFeeds(takeLastPage: boolean = true): void {
    // If already loading we skip
    if (this.loaderState) return;

    // If we need to take last page or not
    if (this.lastPage && takeLastPage) return;

    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API Request
    this.getApiObservable().subscribe({
      // Success State
      next: (pageWrapper) => {
        this.loaderService.endLoading();

        // Updating the data and page values
        this.threadList.push(...pageWrapper.content);
        this.page = pageWrapper.pageable.pageNumber + 1;
        this.lastPage = pageWrapper.last;

        // Showing the info if we don't find any relevant data
        if (this.threadList.length === 0) {
          // If the user is new then he won't have any personalised thread hence we show his popular ones
          if (this.fetchType === 'PERSONALISED' && this.page === 1) {
            this.onFetchTypeChange('POPULAR');

            this.toastService.showToast({
              type: 'info',
              message: `We are yet to figure your personalized feed !! Please explore while we create your personalised feed`,
            });
          } else {
            this.toastService.showToast({
              type: 'info',
              message: `There are no Threads Posted yet. Head over to the post a thread section to post your first Thread !!`,
            });
          }
        }
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function handles the api call to hit
  getApiObservable(): Observable<PageWrapper<ThreadDto>> {
    // Returning the api caller observable
    switch (this.fetchType) {
      case 'TAG_BASED':
        return this.threadService.findThreadsByTag(this.userEnteredTag, {
          page: this.page,
          size: this.pageSize,
        });
      case 'PERSONALISED':
        return this.threadService.findPersonalisedThreads({
          page: this.page,
          size: this.pageSize,
        });
      case 'POPULAR':
        return this.threadService.findPopularThreads({
          page: this.page,
          size: this.pageSize,
        });
    }
  }

  // This function is invoked when the user clicks on the search button
  onSearchClick(searchInput: string): void {
    // Resetting the old data
    this.fetchType = 'TAG_BASED';
    this.page = 0;
    this.threadList = [];
    this.userEnteredTag = searchInput;

    // Calling the API to load data
    this.loadMoreFeeds(false);
  }

  // This function changes the state of the page fetch type
  onFetchTypeChange(fetchType: FetchType): void {
    // Resetting the old data
    this.fetchType = fetchType;
    this.page = 0;
    this.threadList = [];
    this.userEnteredTag = '';

    if (fetchType !== 'TAG_BASED') this.loadMoreFeeds(false);
  }

  // This function is executed when the user clicks on any of the card for Thread
  onThreadCardClick(id: string): void {
    this.router.navigate(['../', 'details', id], { relativeTo: this.route }).then();
  }
}
