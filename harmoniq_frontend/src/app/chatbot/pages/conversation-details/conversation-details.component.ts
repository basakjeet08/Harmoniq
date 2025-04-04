import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import {
  ChatMessageDto,
  MessageType,
} from 'src/app/shared/Models/conversation/ChatMessageDto';
import { ConversationHistoryDto } from 'src/app/shared/Models/conversation/ConversationHistoryDto';
import { ChatbotService } from 'src/app/shared/services/chatbot.service';
import { ConversationService } from 'src/app/shared/services/conversation.service';

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['./conversation-details.component.css'],
  animations: [staggerAnimation],
})
export class ConversationDetailsComponent implements OnInit {
  // This is the data for the components
  messages: ChatMessageDto[] = [];
  loaderState!: boolean;
  userImage: string = '';
  chatBotImage: string = '';
  currentResponse: string = '';
  conversationId = '';

  // Getting the Input component
  @ViewChild(InputComponent) input!: InputComponent;

  // Injecting the necessary dependencies
  constructor(
    private conversationService: ConversationService,
    private chatbotService: ChatbotService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {
    this.loaderService.loaderState$.subscribe(
      (state) => (this.loaderState = state)
    );
  }

  // Fetching the old history messages
  ngOnInit(): void {
    // Starting the loading state
    this.loaderService.startLoading();

    // Fetching the ID for the conversation
    this.conversationId = this.route.snapshot.params['id'];

    // Calling the API
    this.conversationService
      .findConversationHistory(this.conversationId)
      .subscribe({
        // Success State
        next: (conversationHistory: ConversationHistoryDto) => {
          this.loaderService.endLoading();
          this.messages = conversationHistory.chatMessageList;

          // Setting the user and chatbot images
          this.userImage = conversationHistory.userDto.avatar || '';
          this.chatBotImage = conversationHistory.chatBotImage;

          // Checking if its the user's first time in the conversation window or not
          if (conversationHistory.chatMessageList.length === 0) {
            this.onGenerateClick('Hello !!');
            this.toastService.showToast({
              type: 'success',
              message:
                'Created a new Conversation Window and sent a default prompt to start the chatbot',
            });
          } else {
            this.toastService.showToast({
              type: 'success',
              message: 'Conversation History restored successfully !!',
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
}
