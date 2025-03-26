import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
})
export class ConversationDetailsComponent implements OnInit {
  // This is the data for the components
  messages: ChatMessageDto[] = [];
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
  ) {}

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

          // Checking if its the user's first time in the conversation window or not
          if (conversationHistory.chatMessageList.length === 0) {
            this.toastService.showToast({
              type: 'info',
              message:
                'There was no previous conversation history to load data from',
            });

            // Generating the first prompt which will get a introduction of the bot and start the conversation
            this.onGenerateClick('Hello !!');
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
      const newChat = new ChatMessageDto(
        '',
        this.currentResponse,
        MessageType.ASSISTANT,
        new Date()
      );
      this.messages.push(newChat);
      this.currentResponse = '';
    }
  }

  // This function sends the prompt to the service layer
  onGenerateClick(prompt: string) {
    // Setting the loading state
    this.loaderService.startLoading();

    // pushing the user message in the list
    this.messages.push(
      new ChatMessageDto('', prompt, MessageType.USER, new Date())
    );
    this.input.resetComponent();

    // Calling the API
    this.chatbotService
      .generateResponse(prompt, this.conversationId)
      .subscribe({
        // Success State
        next: (chunk: string) => {
          this.loaderService.endLoading();
          this.currentResponse = this.currentResponse + chunk;
        },

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
