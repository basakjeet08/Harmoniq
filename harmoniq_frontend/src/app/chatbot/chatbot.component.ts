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

  // Getting the Input component
  @ViewChild(InputComponent) input!: InputComponent;

  // Injecting the necessary dependencies
  constructor(private chatbotService: ChatbotService) {}

  onGenerateClick(prompt: string) {
    this.input.resetComponent();
    console.log(prompt);
  }
}
