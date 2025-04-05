import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
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

  // Injecting the necessary dependencies
  constructor(
    private conversationService: ConversationService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loaderService.loaderState$.subscribe(
      (state) => (this.loaderState = state)
    );
  }

  // Fetching the necessary conversation list data from the Backend
  ngOnInit(): void {
    this.fetchConversations();
  }

  // This function fetches the conversation list
  fetchConversations() {
    // Starting the loader
    this.loaderService.startLoading();

    // Calling the Api
    this.conversationService.findAllUserConversation().subscribe({
      // Success State
      next: (conversationList: ConversationDto[]) => {
        this.loaderService.endLoading();
        this.conversationList = conversationList;

        if (conversationList.length === 0) {
          this.toastService.showToast({
            type: 'info',
            message: `You don't have any conversation. Create a new conversation and get started with the chatbot !!`,
          });
        } else {
          this.toastService.showToast({
            type: 'success',
            message: 'All the Conversations are fetched Successfully !!',
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

  // This function is invoked when the user adds a new Conversation
  onCreateNewClick(title: string) {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.conversationService.create({ title }).subscribe({
      // Success State
      next: (conversation: ConversationDto) => {
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
  onOpenClick(conversationId: string) {
    this.router.navigate(['../', 'conversation-details', conversationId], {
      relativeTo: this.route,
    });
  }

  // This function is invoked when the user clicks no the delete button
  onDeleteClick(conversationId: string) {
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
          (conversation) => conversation.id !== conversationId
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
