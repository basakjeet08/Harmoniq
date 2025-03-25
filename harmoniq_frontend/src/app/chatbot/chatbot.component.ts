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
  chatResponse: string = '';

  // Getting the Input component
  @ViewChild(InputComponent) input!: InputComponent;

  // Injecting the necessary dependencies
  constructor(
    private chatbotService: ChatbotService,
    private loaderService: LoaderService
  ) {}

  // This function sends the prompt to the service layer
  onGenerateClick(prompt: string) {
    // Setting the loading state
    this.loaderService.startLoading();

    // pushing the user message in the list
    this.messages.push(prompt);
    this.input.resetComponent();

    // let chatResponse: string = '';
    this.chatbotService.generateResponse(prompt).subscribe({
      // Success State
      next: (chunk: string) => {
        this.loaderService.endLoading();
        this.chatResponse = this.chatResponse + chunk;
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        if (this.chatResponse) this.messages.push(this.chatResponse);
        this.messages.push(error.message);
      },

      // Complete State
      complete: () => {
        this.loaderService.endLoading();
        if (this.chatResponse) this.messages.push(this.chatResponse);
      },
    });
  }
}
