import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ThreadDetailResponse } from 'src/app/shared/Models/thread/ThreadDetailResponse';
import { Roles } from 'src/app/shared/Models/user/Roles';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  // This is the data for the component
  isGuest: boolean = false;
  threadDetail: ThreadDetailResponse | null = null;

  // Injecting the necessary dependencies
  constructor(
    private profileService: ProfileService,
    private threadService: ThreadService,
    private commentService: CommentService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {}

  // Fetching the thread id and then fetching its details
  ngOnInit(): void {
    // Setting the user data
    this.isGuest = this.profileService.getUser()?.role === Roles.GUEST;

    const threadId = this.route.snapshot.params['id'];

    // Checking if there is a thread ID provided
    if (threadId) {
      this.fetchThreadData(threadId);
    } else {
      this.toastService.showToast({
        type: 'error',
        message: 'There is no ID provided for the thread',
      });
    }
  }

  // This function fetches the thread Details from the API Call
  fetchThreadData(threadId: string) {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the Api
    this.threadService.findById(threadId).subscribe({
      // Success State
      next: (threadDetail: ThreadDetailResponse) => {
        this.loaderService.endLoading();
        this.threadDetail = threadDetail;
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the comment button
  onCommentClick(comment: string) {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the api to create a comment
    this.commentService
      .create({ comment, threadId: this.threadDetail!.id })
      .subscribe({
        // Success state
        next: () => {
          this.loaderService.endLoading();
          this.fetchThreadData(this.threadDetail!.id);
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
