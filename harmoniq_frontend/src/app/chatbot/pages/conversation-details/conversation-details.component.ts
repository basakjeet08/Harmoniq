import { CHATBOT_AVATAR_URL } from './../../../shared/constants/url-constants';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { PageWrapper } from 'src/app/shared/Models/common/PageWrapper';
import {
  ChatMessageDto,
  MessageType,
} from 'src/app/shared/Models/conversation/ChatMessageDto';
import { ChatbotService } from 'src/app/shared/services/chatbot.service';
import { ConversationService } from 'src/app/shared/services/conversation.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['./conversation-details.component.css'],
})
export class ConversationDetailsComponent implements OnInit {
  // This is the data for the components
  messages: ChatMessageDto[] = [];
  loaderState!: boolean;
  userImage: string = '';
  chatBotImage: string = '';
  currentResponse: string = '';
  conversationId = '';

  // Paging data values
  page = 0;
  pageSize = 10;
  lastPage: boolean = false;

  // Getting the Input component
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;
  @ViewChild(InputComponent) input!: InputComponent;

  // Injecting the necessary dependencies
  constructor(
    profileService: ProfileService,
    private conversationService: ConversationService,
    private chatbotService: ChatbotService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {
    this.loaderService.loaderState$.subscribe(
      (state) => (this.loaderState = state)
    );

    // Setting the user and chatbot avatar
    this.userImage = profileService.getUser()?.avatar || '';
    this.chatBotImage = CHATBOT_AVATAR_URL;
  }

  // Fetching the old history messages
  ngOnInit(): void {
    // Fetching the conversation ID
    this.conversationId = this.route.snapshot.params['id'];

    // Loading the initial (most recent) messages from the history
    this.loadOlderMessages();
  }

  // This function fetches the messages according to the pages
  loadOlderMessages() {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.conversationService
      .findConversationHistory(this.conversationId, {
        page: this.page,
        size: this.pageSize,
      })
      .subscribe({
        // Success State
        next: (pageWrapper: PageWrapper<ChatMessageDto>) => {
          this.loaderService.endLoading();

          // Storing the scroll state
          const container = this.scrollContainer.nativeElement;
          const previousScrollHeight = container.scrollHeight;

          // Adding the new elements at the start of
          this.messages.unshift(...pageWrapper.content.reverse());
          this.page++;
          this.lastPage = pageWrapper.last;

          // Making sure the scroll state is managed
          requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight - previousScrollHeight;
          });

          // Checking if its the user's first time in the conversation window or not
          if (this.messages.length === 0) {
            this.onGenerateClick('Hello !!');
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

  // This funcition tells if the message is a user message or not
  isUserMessage(message: ChatMessageDto) {
    return message.messageType === MessageType.USER;
  }

  // This function updates the message array with chat bot responses
  updateMessage() {
    if (this.currentResponse) {
      this.messages.push({
        id: '',
        text: this.currentResponse,
        messageType: MessageType.ASSISTANT,
        createdAt: new Date(),
      });

      this.currentResponse = '';
      this.scrollToBottom();
    }
  }

  // This function sends the prompt to the service layer
  onGenerateClick(prompt: string) {
    // Setting the loading state
    this.loaderService.startLoading();

    // pushing the user message in the list
    this.messages.push({
      id: '',
      text: prompt,
      messageType: MessageType.USER,
      createdAt: new Date(),
    });

    this.input.resetComponent();
    this.currentResponse = ' ';
    this.scrollToBottom();

    // Calling the API
    this.chatbotService
      .generateResponse(prompt, this.conversationId)
      .subscribe({
        // Success State
        next: (chunk: string) => (this.currentResponse += chunk),

        // Error State
        error: (error: Error) => {
          // Storing the chat response if any proper response is generated before the error
          this.loaderService.endLoading();
          this.updateMessage();

          // Storing the error as a new Response
          this.currentResponse = error.message;
          this.updateMessage();
        },

        // Complete State
        complete: () => {
          this.loaderService.endLoading();
          this.updateMessage();
        },
      });
  }

  // This function is called when the user scrolls
  onScroll(): void {
    const target = this.scrollContainer.nativeElement;

    // If the user reaches the top then we fetch older messages
    if (target.scrollTop === 0) this.loadOlderMessages();
  }

  // This function takes the user to the most current scroll location (Bottom of scroll)
  scrollToBottom(): void {
    requestAnimationFrame(() => {
      const container = this.scrollContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    });
  }
}
