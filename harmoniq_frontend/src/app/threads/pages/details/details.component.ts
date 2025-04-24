import { InputComponent } from '../../../shared/components/input/input.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Roles } from 'src/app/shared/Models/user/Roles';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { ThreadDto } from '../../../shared/Models/thread/ThreadDto';
import { CommentDto } from '../../../shared/Models/comment/CommentDto';
import { PageWrapper } from '../../../shared/Models/common/PageWrapper';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [staggerAnimation],
})
export class DetailsComponent implements OnInit {
  // This is the data for the component
  isGuest: boolean = false;
  threadDetail: ThreadDto | null = null;
  commentList: CommentDto[] = [];
  loaderState!: boolean;

  // Paging data values
  page: number = 0;
  pageSize: number = 10;
  lastPage: boolean = false;

  // Child Input Component
  @ViewChild(InputComponent) input!: InputComponent;

  // Injecting the necessary dependencies
  constructor(
    private profileService: ProfileService,
    private threadService: ThreadService,
    private commentService: CommentService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
  ) {
    this.loaderService.loaderState$.subscribe((state) => (this.loaderState = state));
  }

  // Fetching the thread id and then fetching its details
  ngOnInit(): void {
    // Setting the user data and the thread id
    this.isGuest = this.profileService.getUser()?.role === Roles.GUEST;
    const threadId = this.route.snapshot.params['id'];

    // Checking if there is a thread ID provided
    this.loadThreadData(threadId);
  }

  // This function fetches the thread Details from the API Call
  loadThreadData(threadId: string): void {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the Api
    this.threadService.findById(threadId).subscribe({
      // Success State
      next: (threadDetail: ThreadDto) => {
        this.loaderService.endLoading();
        this.threadDetail = threadDetail;

        // Loading the initial Comments
        this.loadMoreComments();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  loadMoreComments(): void {
    if (this.loaderState || this.lastPage) return;

    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.commentService
      .findCommentsForThread(this.threadDetail!.id, {
        page: this.page,
        size: this.pageSize,
      })
      .subscribe({
        //   Success State
        next: (pageWrapper: PageWrapper<CommentDto>) => {
          this.loaderService.endLoading();

          // Updating the data and page values
          this.commentList.push(...pageWrapper.content);
          this.page = pageWrapper.pageable.pageNumber + 1;
          this.lastPage = pageWrapper.last;
        },

        // Error State
        error: (error: Error) => {
          this.loaderService.endLoading();
          this.toastService.showToast({ type: 'error', message: error.message });
        },
      });
  }

  // This function is invoked when the user clicks on the comment button
  onCommentClick(comment: string): void {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the api to create a comment
    this.commentService.create({ comment, threadId: this.threadDetail!.id }).subscribe({
      // Success state
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'New comment is added to this thread !!',
        });

        this.input.resetComponent();

        // Resetting the comments to fetch again
        this.page = 0;
        this.lastPage = false;
        this.commentList = [];
        this.loadMoreComments();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({
          type: 'error',
          message: error.message,
        });
      },
    });
  }
}
