import { Component, OnInit } from '@angular/core';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { ThreadDto } from '../../../shared/Models/thread/ThreadDto';
import { PageWrapper } from '../../../shared/Models/common/PageWrapper';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [staggerAnimation],
})
export class HistoryComponent implements OnInit {
  // This is the data for the component
  threadList: ThreadDto[] = [];
  loaderState!: boolean;

  // Paging data values
  page: number = 0;
  pageSize: number = 10;
  lastPage: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private toastService: ToastService,
    private loaderService: LoaderService,
  ) {
    this.loaderService.loaderState$.subscribe((state) => (this.loaderState = state));
  }

  // Fetching the history thread list when the component is loaded
  ngOnInit(): void {
    this.loadMoreThreads();
  }

  // This function fetches the history data from the API
  loadMoreThreads(): void {
    if (this.loaderState || this.lastPage) return;

    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.threadService.fetchThreadHistory({ page: this.page, size: this.pageSize }).subscribe({
      // Success State
      next: (pageWrapper: PageWrapper<ThreadDto>) => {
        this.loaderService.endLoading();

        // Updating the data
        this.threadList.push(...pageWrapper.content);
        this.page = pageWrapper.pageable.pageNumber + 1;
        this.lastPage = pageWrapper.last;

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
  onDeleteThreadClick(id: string): void {
    // Setting the loading State
    this.loaderService.startLoading();

    // Calling the API
    this.threadService.deleteById(id).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        // Updating the current list without calling the loading api again
        this.threadList = this.threadList.filter((thread) => thread.id !== id);

        this.toastService.showToast({
          type: 'success',
          message: 'Thread deleted successfully !!',
        });
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
