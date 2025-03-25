import { LoaderService } from './../shared/components/loader/loader.service';
import { Component, ViewChild } from '@angular/core';
import { InputComponent } from '../shared/components/input/input.component';
import { ChatbotService } from '../shared/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  // This is the data for the components
  messages: string[] = [];
  currentResponse: string = '';

  // Getting the Input component
  @ViewChild(InputComponent) input!: InputComponent;

  // Injecting the necessary dependencies
  constructor(
    private chatbotService: ChatbotService,
    private loaderService: LoaderService
  ) {}

  // This function updates the message array with chat bot responses
  updateMessage() {
    if (this.currentResponse) {
      this.messages.push(this.currentResponse);
      this.currentResponse = '';
    }
  }

  // This function sends the prompt to the service layer
  onGenerateClick(prompt: string) {
    // Setting the loading state
    this.loaderService.startLoading();

    // pushing the user message in the list
    this.messages.push(prompt);
    this.input.resetComponent();

    // Calling the API
    this.chatbotService.generateResponse(prompt).subscribe({
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
