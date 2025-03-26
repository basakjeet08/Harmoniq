import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ConversationDto } from 'src/app/shared/Models/conversation/ConversationDto';
import { ConversationService } from 'src/app/shared/services/conversation.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'],
})
export class ConversationListComponent implements OnInit {
  // These are the data for this component
  conversationList: ConversationDto[] = [];

  // Injecting the necessary dependencies
  constructor(
    private conversationService: ConversationService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

        this.toastService.showToast({
          type: 'success',
          message: 'All the Conversations are fetched Successfully !!',
        });
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
}
