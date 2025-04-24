import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { PageWrapper } from 'src/app/shared/Models/common/PageWrapper';
import { ConversationDto } from 'src/app/shared/Models/conversation/ConversationDto';
import { ConversationService } from 'src/app/shared/services/conversation.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'],
  animations: [staggerAnimation],
})
export class ConversationListComponent implements OnInit {
  // These are the data for this component
  conversationList: ConversationDto[] = [];
  loaderState!: boolean;

  // Paging data values
  page: number = 0;
  pageSize: number = 10;
  lastPage: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private conversationService: ConversationService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loaderService.loaderState$.subscribe((state) => (this.loaderState = state));
  }

  // Fetching the necessary conversation list data from the Backend
  ngOnInit(): void {
    this.loadMoreConversations();
  }

  // This function fetches the conversation list
  loadMoreConversations(): void {
    // If already loading or end of data
    if (this.loaderState || this.lastPage) return;

    // Starting the loader
    this.loaderService.startLoading();

    // Calling the Api
    this.conversationService
      .findAllUserConversation({ page: this.page, size: this.pageSize })
      .subscribe({
        // Success State
        next: (pageWrapper: PageWrapper<ConversationDto>) => {
          this.loaderService.endLoading();

          // Updating the data
          this.conversationList.push(...pageWrapper.content);
          this.page = pageWrapper.pageable.pageNumber + 1;
          this.lastPage = pageWrapper.last;

          // Showing message if the user doesn't have any conversation window
          if (this.conversationList.length === 0) {
            this.toastService.showToast({
              type: 'info',
              message: `You don't have any conversation. Create a new conversation and get started with the chatbot !!`,
            });
          }
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

  // This function is invoked when the user adds a new Conversation
  onCreateNewClick(title: string): void {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.conversationService.create({ title }).subscribe({
      // Success State
      next: (conversation: ConversationDto): void => {
        this.loaderService.endLoading();
        this.onOpenClick(conversation.id);
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the Open button is clicked
  onOpenClick(conversationId: string): void {
    this.router
      .navigate(['../', 'conversation-details', conversationId], {
        relativeTo: this.route,
      })
      .then();
  }

  // This function is invoked when the user clicks no the delete button
  onDeleteClick(conversationId: string): void {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.conversationService.deleteById(conversationId).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Conversation Deleted Successfully !!',
        });

        this.conversationList = this.conversationList.filter(
          (conversation: ConversationDto) => conversation.id !== conversationId,
        );
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
