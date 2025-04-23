import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Roles } from 'src/app/shared/Models/user/Roles';
import { UserDto } from 'src/app/shared/Models/user/UserDto';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css'],
})
export class ThreadCardComponent {
  // These are the various inputs and outputs to the component
  @Input('createdBy') createdBy!: UserDto;

  @Input('threadId') threadId: string = '';
  @Input('description') description: string = '';
  @Input('tagList') tagList: string[] = [];
  @Input('totalLikes') totalLikes: number = 0;
  @Input('totalComments') totalComments: number = 0;
  @Input('isLiked') isLiked: boolean = false;

  @Input('showDelete') showDelete: boolean = false;
  @Input('showMore') showMore: boolean = true;

  @Output('onShowMoreClick') showMoreEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output('onDeleteClick') deleteEmitter: EventEmitter<void> = new EventEmitter<void>();

  loaderState!: boolean;

  // Injecting the necessary dependencies
  constructor(
    private threadService: ThreadService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
  ) {
    this.loaderService.loaderState$.subscribe((state) => (this.loaderState = state));
  }

  // This function gives if the user is a moderator or not
  get isModerator(): boolean {
    return this.createdBy.role === Roles.MODERATOR;
  }

  // This function is invoked when the thread card is clicked
  onShowMoreClick(): void {
    this.showMoreEmitter.emit();
  }

  // This function is invoked when the delete button is clicked
  onDeleteClick(): void {
    this.deleteEmitter.emit();
  }

  // This function is invoked when the like button is clicked
  onLikeButtonClick(): void {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.threadService.toggleThreadLike(this.threadId).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();
        this.totalLikes = this.totalLikes + (this.isLiked ? -1 : 1);
        this.isLiked = !this.isLiked;
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the user avatar
  onAvatarClick(): void {
    this.router.navigate(['/dashboard/profile', this.createdBy.id]).then();
  }
}
